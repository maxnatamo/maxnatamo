import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

import remarkPrism from 'remark-prism';
import remarkSectionize from 'remark-sectionize';

// https://astro.build/config
export default defineConfig({
  site: 'https://maxtrier.dk',
  prefetch: true,
  integrations: [mdx(), sitemap(), tailwind(), compress()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false
    },
    remarkPlugins: [remarkPrism, remarkSectionize],
    remarkRehype: {
      footnoteBackContent: "^"
    },
  },
  redirects: {
    "/blog/self-hosting-mailserver": "/blog/2022/03/self-hosting-mailserver",
    "/blog/nintendo-ds-save-dumping": "/blog/2022/07/nintendo-ds-save-dumping",
    "/blog/gitlab-terraform-state": "/blog/2023/03/gitlab-terraform-state",
  }
});