---
title: 🙋‍♂️ Misconceptions about EF Core
description: Listing some of my pet grievances about others misunderstanding EF Core.
publishDate: 'Sep 25 2024'
category: tech
---

<!-- vale Microsoft.Adverbs = NO -->

## Surely, it can't be used for production

Throughout my, admittedly short career, I've heard about half a dozen developers say that EF Core shouldn't be used for production services. That it's simply a gimmick that junior developers use for the projects, because they wouldn't have to learn "proper" SQL. Or, better yet, is *completely incompatible* without their workflow.

Is that actually true, though? Surely, they weren't just saying that because of they've heard it somewhere. I'll list some concerns I've heard and read people mention, when they talk about why they don't use EF Core.

## "Entity Framework Core requires you to use migrations"

The most common misconception I've heard comes from three different lead developers, all claiming that EF Core requires migrations. From what I can read from the documentation, *is has never been a requirement.* It's simply a feature, which you can opt in to use for your project. Although, I can see where the confusion comes from. The official ["Getting Started"](https://learn.microsoft.com/en-us/ef/core/get-started/overview/install) documentation only mentions it briefly:

> You **can** install tools to carry out EF Core-related tasks in your project, like creating and applying database migrations, or creating an EF Core model based on an existing database.

*Note that the original documentation has no emphasis on 'can.'*

In the later sections where you scaffold the database, it isn't pointed out as being optional:

> The following steps use [migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) to create a database.

In reality, EF Core places no restrictions on *how* you create and manage your database schema. Only that they match when requested. You can just as well migrate database schemas manually, should you really want to.

To be fair, there's still an argument to be made whether you *should* use migrations for your project. But, I'll let your teams decide that.

## "Entity Framework Core generates unoptimized SQL"

When you run some SQL query using EF Core, you might be able to glean the resulting query from the logs. As an example, it might look something like this:

```sql
SELECT [i].[ID], [i].[FirstName], [i].[HireDate], [i].[LastName], [o].[InstructorID]
FROM [Instructor] AS [i]
LEFT JOIN [OfficeAssignments] AS [o] ON [i].[ID] = [o].[InstructorID]
LEFT JOIN (
    SELECT [c].[CoursesCourseID], [c].[InstructorsID], [c0].[CourseID], [c0].[Credits], [c0].[Department]
    FROM [CourseInstructor] AS [c]
    INNER JOIN [Course] AS [c0] ON [c].[CoursesCourseID] = [c0].[CourseID]
    INNER JOIN [Departments] AS [d] ON [c0].[DepartmentID] = [d].[DepartmentID]
) AS [t] ON [i].[ID] = [t].[InstructorsID]
ORDER BY [i].[LastName], [i].[ID], [o].[InstructorID], [t].[CoursesCourseID], [t].[InstructorsID],
```

And your first reaction might be something like "who writes SQL like this?" In reality, no one does. The query generators does. And as unreadable as this might seem, the query optimizer really doesn't care about whether the query is human readable.

I've heard one developer say that EF Core uses sub-queries, as opposed to joins, which are worse for performance. In the example above, which was lifted from [this StackOverflow answer](https://stackoverflow.com/a/66662556), it uses both. Relational databases have been a thing for many decades, so it's naïve to assume that nothing has changed since them. Query optimizers have become much more performant and efficient over many years, to where [Postgres even uses genetic algorithms to optimize queries](https://www.postgresql.org/docs/current/geqo-intro2.html). And that was introduced more than 20 years ago![^1]

My point is, whether EF Core writes more or less efficient queries, it shouldn't really matter. If anything, the difference would only be marginal and I personally don't want to compete against hundreds (maybe thousands) of smart developers and decades of compiler experience.

And if you really *are* smarter than the compiler, then you wouldn't be reading this post.

## "You can't use Entity Framework Core for complex schemas"

EF Core actually has pretty good support for more complex schemas, such as [lists](https://learn.microsoft.com/en-us/ef/core/modeling/sequences), [inherited types](https://learn.microsoft.com/en-us/ef/core/modeling/inheritance), [multiple primary keys](https://learn.microsoft.com/en-us/ef/core/modeling/keys?tabs=data-annotations), [keyless types](https://learn.microsoft.com/en-us/ef/core/modeling/keyless-entity-types?tabs=data-annotations), [all types of relationships](https://learn.microsoft.com/en-us/ef/core/modeling/relationships), and more. If there's some feature that EF Core has no support for, you can still take use of EF Core. It just means that you might not have first-class support in migrations, querying, etc.

If you *really* need first-class support, and you claim that your schema isn't actually just overly complicated, you can still use good old fashioned SQL:

```cs
var blogs = context.Blogs
    .FromSql($"SELECT * FROM dbo.Blogs")
    .ToList();
```

You can even pass parameters to the query, without having to worry about SQL injection, as it uses .NET's new [FormattableString type](https://learn.microsoft.com/en-us/dotnet/api/system.formattablestring?view=net-8.0), which are safe against SQL injection attacks.

```cs
var username = "johndoe";

var blogs = context.Blogs
    .FromSql($"SELECT * FROM [Blogs] WHERE [User] = {username}")
    .ToList();
```

For more information, read the [official documentation about SQL queries in EF Core](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries).

If none of that's your cup of tea, nothing is stopping you from [Dapper](https://github.com/DapperLib/Dapper) along with EF Core.

[^1]: Well, at least since Postgres 7.2, which is from 2002: https://web.mit.edu/cygwin/cygwin_v1.3.2/usr/doc/postgresql-7.1.2/html/geqo.html

<!-- vale Microsoft.Adverbs = YES -->
