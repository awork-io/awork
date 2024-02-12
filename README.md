![Logo](https://cdn.awork.com/img/logo/blue/complete/blue-complete.svg)

[awork](https://www.awork.com/) is an awesome work management tool that helps you to be more productive. Next to a [web app](https://app.awork.com/) and an app for [iOS](https://apps.apple.com/de/app/awork-organisiere-dein-team/id1466945183) and [Android](https://play.google.com/store/apps/details?id=io.awork\&hl=gsw\&gl=US), we also provide a rich API that enables external developers to integrate awork into their workflows. Here you can find more details, FAQ's, code examples and a help forum to get you started even faster.

Detailed infos about the API can be found in our [Developer Docs](https://developers.awork.com/). If you have general questions about how awork works, check out our [Help Center](https://support.awork.com/en).

If you have any questions or need help, feel free to post in the [awork Community Developer Forum]([https://github.com/awork-io/awork/issues](https://community.awork.com/c/developer-forum/17)).

We currently have code examples for C# and Typescript. You can find them in the examples folder above.

### FAQ

#### Can I import the Swagger API definition into Postman or other clients?

Yes, you can use this link to import it: [https://swagger-doc.awork.com/api/swagger-combine](https://swagger-doc.awork.com/api/swagger-combine)

#### What is the easiest option for authorization for the API?

The awork API needs authentication for most endpoints.

The easiest way for authentication is to use Token Auth with an admin-level Bearer token which you can create in your awork application: [Client Applications and API Keys](https://support.awork.com/en/articles/5415664-client-applications-and-api-keys)

The other option for personal authentication is OAuth 2.0: [API Authentication](https://developers.awork.com/#authentication)

#### How do permissions work?

In awork there are different permissions for each of the entities, like projects, tasks and users. For each entity you can either have no, read or write permissions. The permissions you have depends on your general user role in the workspace, allowing you f.e. to see all tasks and edit all projects, or your project specific permissions that are connected to your project role. So in one project you can be able to see all timetrackings, and in another one you can only see the project overview.

More information on permissions can be found in the [Help Center](https://support.awork.com/en/articles/5382825-permission-management) or in the [Permissions Section](https://developers.awork.com/permissions) of the Developer Docs.

#### Does the API have pagination?

Yes, the awork API supports pagination. More information can be found in the [Developer Docs](https://developers.awork.com/pagination-and-filtering). You can specify pagination attributes in your request by adding the `page` and `pageSize` attributes like this:

```
https://api.awork.com/api/v1/users?page=1&pageSize=50
```

Now you can reach the next page by setting `page=2` and keeping the page size the same. The limit for the page size is 1000 entries.

#### How can I filter my API request?

The API supports filtering using the following syntax. You can filter most of the API endpoints by adding an additional filter attribute to your request: `filterby=...` More filter options can be found in the [Filtering](https://developers.awork.com/filtering) section of the Developer Docs.

```
https://api.awork.com/api/v1/users?filterby=firstname eq 'John'
```

In this example, you can filter all users and only return those that have a first name of `John`. If you want to filter a list of objects, like the members of a project, you can do so like this:

```
https://api.awork.com/api/v1/projects?filterby=members/any(p: p\FirstName eq 'Neil')
```

In this example only projects are returned that have a member with the first name `Neil`.

#### Can I find deleted entries via the API?

No, deleted entries cannot be requested from the API. Instead of deleting data completely, we recommend using the archiving option whenever possible.

#### Does awork provide webhooks so I can get notified of changes?

Yes, you can create webhooks in awork. More information about this can be found in our [Developer Docs](https://developers.awork.com/webhooks).

### Code Examples

* [NodeJS examples](examples/nodejs/)
* [C# examples](examples/csharp/)
* [Python3 examples](examples/python/)

### API Clients (third party)

* https://www.npmjs.com/package/@brandboostinggmbh/awork-sdk
* https://github.com/timkley/awork-php-sdk
