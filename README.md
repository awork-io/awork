# README

![Logo](https://www.awork.io/wp-content/uploads/2019/01/aworkLogoB-1.svg)

[awork](https://www.awork.io/) is an awesome work management tool that helps you to be more productive. Next to a [web app](https://app.awork.io/) and an app for [iOS](https://apps.apple.com/de/app/awork-organisiere-dein-team/id1466945183) and [Android](https://play.google.com/store/apps/details?id=io.awork\&hl=gsw\&gl=US), we also provide a rich API that enables external developers to integrate awork into their workflows. Here you can find more details, FAQ's, code examples and a help forum to get you started even faster.

Detailed infos about the API can be found under: https://developers.awork.io/ If you have general questions about how awork works, check out our [Help Center](https://support.awork.io/hc/en-us).

If you have any questions or need help, feel free to open an issue in the [Issues Tab](https://github.com/awork-io/awork/issues)

We currently have code examples for C# and Typescript. You can find them in the examples folder above.

### FAQ

#### Can i import the swagger API definition into Postman or other clients?

Yes, you can use this link to import it: [https://awork-function-swaggercombine-global.azurewebsites.net/api/swagger-combine](https://awork-function-swaggercombine-global.azurewebsites.net/api/swagger-combine)

#### What is the easiest option for authorization for the API?

The awork API needs authentication for most endpoints. The easiest way for authentication is to use Token Auth with a Bearer token which you can create in your awork application: [Client Applications and API Keys](https://support.awork.io/hc/en-us/articles/360002815960-Client-Applications-and-API-Keys)

The other option would be to use OAuth 2.0: [API Authentication](https://developers.awork.io/#authentication)

#### How do permissions work?

In awork there are different permissions for each of the entities, like projects, tasks and users. For each entity you can either have no, read or write permissions. The permissions you have depends on your general user role in the workspace, allowing you f.e. to see all tasks and edit all projects, or your project specific permissions that are connected to your project role. So in one project you can be able to see all timetrackings, and in another one you can only see the project overview.

More information on permissions can be found in the [Help Center](https://support.awork.io/en/articles/5382825-permission-management) or in the [Permissions Section](https://developers.awork.io/permissions) in the developer docs.

#### Does the API have pagination?

Yes, the awork API supports pagination. More information can be found in the [API Docs](https://developers.awork.io/pagination-and-filtering). You can specify pagination attributes in your request by adding the `page` and `pageSize` attributes like this:

```
https://api.awork.io/api/v1/users?page=1&pageSize=50
```

Now you can reach the next page by setting `page=2` and keeping the page size the same. The limit for the page size is 1000 entries.

#### How can I filter my API request?

The API supports filtering using the following syntax. You can filter most of the API endpoints by adding an additional filter attribute to your request: `filterby=...` More filter options can be found in the [Filter section](https://developers.awork.io/filtering).

```
https://api.awork.io/api/v1/users?filterby=firstname eq 'John'
```

In this example, you can filter all users and only return those that have a first name of `John`. If you want to filter a list of objects, like the members of a project, you can do so like this:

```
https://awork.io/api/v1/projects?filterby=members/any(p: p\FirstName eq 'Neil')
```

In this example only projects are returned that have a member with the first name `Neil`.

#### Can I find deleted data via the API?

No, deleted data cannot be requested from the API. Instead of deleting data completely, we recommend using the archiving option whenever possible.

#### Does awork provide webhooks so I can sync changes?

Yes, you can create webhooks in awork. More information about this can be found in our [Help Center](https://support.awork.io/en/articles/5415462-webhooks).

A webhook is triggered for your entire workspace. So for example on the `project-added` webhook, you receive events for all projects created in your workspace, no matter who created it or to which team it belongs.

The supported event types include:

* Client added
* Client deleted
* File added
* File deleted
* Project added
* Project comment added
* Project deleted
* Project member added
* Project member deleted
* Project status changed
* Project task added
* Project task deleted
* Task assignment added
* Task assignment deleted
* Task comment added
* Task status changed
* Time tracking added
* Time tracking deleted
* User activation changed
* User added
* User deleted

Webhooks can be configured in your awork workspace under Settings > Integrations.

### Code Examples

* [NodeJS examples](examples/nodejs/)
* [C# examples](examples/csharp/)
* [Python3 examples](examples/python/)

### API Clients (third party)

* https://www.npmjs.com/package/@brandboostinggmbh/awork-sdk
* https://github.com/timkley/awork-php-sdk
