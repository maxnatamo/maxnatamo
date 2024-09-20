---
title: 🏗️ Using Terraform and GitLab CI together with Managed State and IaC
description: Centralize your Terraform state and manage it on Gitlab.
publishDate: 'Mar 27 2023'
---

## Preface

I currently use GitOps for my deployments to Kubernetes and Docker containers on my home server. My goal is 
to possibly make a somewhat 'production-grade' setup, even though it's hosted on bare-metal at home.

To facilitate that, I use Hashicorp Terraform to setup my Kubernetes cluster from scratch. This has several advantages:
* Allows anyone to replicate your server infrastructure
* It makes server provisioning and setup less manual, minimizing human error
* Faster deployment on new servers, with identical configuration

I, as a single developer, don't take advantage of some of these, as I only have one server and a small DevOps budget. But, the 
concepts scale all the way to multi-cluster setups.

As part of using Terraform, it's nice to automatically provision new hardware, when such a state is desired. This can inherently be done 
by all build- and CI-systems, but I like to use GitLab CI, for it's seamless integration with GitLab and it's simplicity.

### Managed State

Terraform uses states to make sure no resource is provisioned twice. This is much like the desired-state/current-state of Kubernetes, where you'd want the to to match.
Instead of saving the state in a daemon, Terraform saves it in a `terraform.tfstate`-file. This is fine for a single developer, but it falls apart when multiple developers and/or multiple machines are used to deploy.

For that reason, GitLab has a option for *Terraform Managed State*. This will save the Terraform state on GitLab itself, which will persist through builds.

I **highly recommend** you use and/or enable this for your project, as it can be invaluable.

For more information, read the [official documentation](https://docs.gitlab.com/ee/user/infrastructure/iac/terraform_state.html).

## Sample Terraform project

I've decided to create a simple Terraform project, just for this example. I won't include everything, as you can probably guess yourself to most of the providers, configurations, etc.

The main file we should think about, is `main.tf`:
```js
# Create MetalLB namespace
resource "kubernetes_namespace" "metallb" {
  metadata {
    name = "metallb"
  }
}

# Install MetalLB with Helm
resource "helm_release" "metallb_helm" {
  name      = "metallb"
  namespace = "metallb"
  chart     = "metallb"

  wait          = true
  wait_for_jobs = true

  repository = "https://metallb.github.io/metallb"

  depends_on = [
    kubernetes_namespace.metallb
  ]
}

# Instantiate IPAddressPool-resource for MetalLB
resource "kubectl_manifest" "metallb_addr_pool" {
  yaml_body = <<YAML
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: ${var.addr_pool_name}
  namespace: metallb
spec:
  addresses:
    - ${var.addr_pool_range}
YAML

  depends_on = [
    helm_release.metallb_helm
  ]
}

# Instantiate L2Advertisement-resource for MetalLB
resource "kubectl_manifest" "metallb_l2_adv" {
  yaml_body = <<YAML
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: ${var.addr_pool_name}
  namespace: metallb
spec:
  ipAddressPools:
    - ${var.addr_pool_name}

YAML

  depends_on = [
    helm_release.metallb_helm
  ]
}
```

For reference, this will be our `variables.tf`:
```js
variable "addr_pool_name" {
  type        = string
  description = "The name of the default MetalLB address pool for load-balancers."
  default     = "og01-addr-pool"
}

variable "addr_pool_range" {
  type        = string
  description = "The IP-address range of the default MetalLB address pool for load-balancers."
  default     = "10.0.48.1-10.0.48.254"
}
```

It should be noted, that GitLab requires the `http`-backend to be enabled, as well:

`versions.tf`
```js
terraform {
  [...]

  backend "http" {}
}
```

This Terraform module will deploy a MetalLB chart via Helm and apply the necessary manifests for assigning IP addresses.

A possible folder structure for something like this might be:
```sh
[root]
  ├ main.tf
  ├ providers.tf
  ├ variables.tf
  └ versions.tf
```

## Initalizing Managed State

As per the GitLab documentation, it is smart to initialize your Managed State before you commit your `.gitlab-ci.yml`. You can do like this, [reference](https://docs.gitlab.com/ee/user/infrastructure/iac/terraform_state.html#set-up-the-initial-backend):

```sh
PROJECT_ID="<gitlab-project-id>"
TF_STATE_NAME="tf_state"
TF_USERNAME="<gitlab-username>"
TF_PASSWORD="<gitlab-personal-access-token>"
TF_ADDRESS="https://gitlab.com/api/v4/projects/${PROJECT_ID}/terraform/state/${TF_STATE_NAME}"

terraform init \
  -backend-config=address=${TF_ADDRESS} \
  -backend-config=lock_address=${TF_ADDRESS}/lock \
  -backend-config=unlock_address=${TF_ADDRESS}/lock \
  -backend-config=username=${TF_USERNAME} \
  -backend-config=password=${TF_PASSWORD} \
  -backend-config=lock_method=POST \
  -backend-config=unlock_method=DELETE \
  -backend-config=retry_wait_min=5
```

If successful, you should be able to see your new state in GitLab under **Infrastructure > Terraform** under your project.

If you want to see the plan for the deployment, run
```sh
terraform plan
```

## .gitlab-ci.yml

Now that we have a valid state on GitLab and a working Terraform module, we can setup our CI/CD configuration.

For the bare-minimum, we can use the `gitlab-terraform` wrapper from GitLab:
```yml
stages:
  - prepare
  - validate
  - plan
  - deploy

.terraform-base:
  image: registry.gitlab.com/gitlab-org/terraform-images/stable:latest
  variables:
    # Terraform init-flags
    TF_ROOT: ${CI_PROJECT_DIR}
    TF_STATE_NAME: tf_state
    TF_ADDRESS: ${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/${TF_STATE_NAME}
    TF_INIT_FLAGS: -lockfile=readonly
  before_script:
    - cd ${TF_ROOT} # Needed if TF_ROOT is not the root of the project
  only:
    changes:
    - ${TF_ROOT}/*
  cache:
    key: tf_state
    paths:
      - ${TF_ROOT}/.terraform

tf-init:
  stage: prepare
  extends: .terraform-base
  script:
    - gitlab-terraform init

tf-validate:
  stage: validate
  extends: .terraform-base
  script:
    - gitlab-terraform validate

tf-format:
  stage: validate
  extends: .terraform-base
  script:
    - gitlab-terraform fmt -check -diff

tf-plan:
  stage: plan
  extends: .terraform-base
  script:
    - gitlab-terraform plan
    - gitlab-terraform plan-json
  artifacts:
    name: plan
    paths:
      - ${TF_ROOT}/plan.cache
    reports:
      terraform: ${TF_ROOT}/plan.json

tf-apply:
  stage: deploy
  extends: .terraform-base
  environment:
    name: production
  dependencies:
    - tf-plan
  script:
    - gitlab-terraform apply -auto-approve
  only:
    refs:
      - main
```

This pipeline will use all the default values specified in the Terraform `variables.tf` file. To set custom values, either statically in the build-file or dynamically with CI/CD variables:

```yaml
.terraform-base:
  image: registry.gitlab.com/gitlab-org/terraform-images/stable:latest
  variables:
    # Terraform configuration flags
    TF_VAR_addr_pool_name: ${KUBERNETES_ADDR_POOL_NAME}
    TF_VAR_addr_pool_range: ${KUBERNETES_ADDR_POOL_RANGE}

    [...]
```

Simply prepend `TF_VAR_` to the variable name, and Terraform will fill in the new value. In this example, the values are defined as CI/CD variables.

## Remote data backend

While this solves most problems, we still have decentralized states. One on GitLab and one locally. To make up for that, we can define GitLab as a remote data source for our state:

`variables.tf`
```js
variable "remote_state_address" {
  type        = string
  description = "Remote state file address"
}

variable "remote_state_username" {
  type        = string
  description = "Username for querying remote state"
}

variable "remote_state_access_token" {
  type        = string
  description = "Access token for querying remote state"
}

[...]
```

Next, define the data source in any Terraform file:
```js
data "terraform_remote_state" "gitlab_state" {
  backend = "http"

  config = {
    address  = var.remote_state_address
    username = var.remote_state_username
    password = var.remote_state_access_token
  }
}
```

And, define those variables in `.gitlab-ci.yml`:
```yml
.terraform-base:
  image: registry.gitlab.com/gitlab-org/terraform-images/stable:latest
  variables:
    [...]

    # Terraform managed state
    TF_VAR_remote_state_address: ${TF_ADDRESS}
    TF_VAR_remote_state_username: gitlab-ci-token
    TF_VAR_remote_state_access_token: ${CI_JOB_TOKEN}
```

For a full example, see the sample repository [here](https://github.com/maxnatamo/terraform-example).