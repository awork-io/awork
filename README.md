# awork.io
[awork](https://www.awork.io/) is an awesome work management tool that helps you to be more productive. Next to a [webapp](https://app.awork.io/) and an app for [IOS](https://apps.apple.com/de/app/awork-organisiere-dein-team/id1466945183) and [Android](https://play.google.com/store/apps/details?id=io.awork&hl=gsw&gl=US), we also provide a rich API that enables external developers to integrate awork into their workflows.
In this github repo you will find important infos, a FAQ with the most frequently asked questions and code examples that help you get started even faster.

Detailed infos about the API can be found under: https://developers.awork.io/
If you have general questions about how awork works, check out our [Help Center](https://support.awork.io/hc/en-us)

If you have any issues, feel free to open one in the [Issues Tab](https://github.com/awork-io/awork/issues)

We currently have code examples for C# and typescript. You can find them in the examples folder above.

## FAQ

### What is the easiest option for authorization for the API?
The awork API needs authentication for most endpoints. The easiest way for authentication is to use Token Auth with a Bearer token which you can create in your awork application: [Client Applications and API Keys](https://support.awork.io/hc/en-us/articles/360002815960-Client-Applications-and-API-Keys)

The other option would be to use OAuth 2.0: [API Authentication](https://developers.awork.io/#authentication)

### How do permissions work?
In awork there are different permissions for each of the entities, like projects, tasks and users. For each entity you can either have no, read or write permissions. The permissions you have depends on your general user role in the workspace, allowing you f.e. to see all tasks and edit all projects, or your project specific permissions that are connected to your project role. So in one project you can be able to see all timetrackings, and in another one you can only see the project overview.

More information on permissions can be found here: https://support.awork.io/hc/en-us/articles/360002811220-Permissions or in the [Permissions Section](https://developers.awork.io/#permissionsconcept) in the developer docs.

### Does the API have pagination?
Yes, the awork API has pagination which can be found in the Pagition section under [API Description](https://developers.awork.io/#api-description). You can add pagination behind your query by adding the page and pageSize attribute like this:
```
https://api.awork.io/api/v1/users?page=1&pageSize=50
```
Now you can reach the next page by setting page=2 and keeping the page size the same. The limit for the page size is 1000 entries.

### How can I filter my API request?
The API supports filtering using the ODATA syntax. You can filter most of the API endpoints by adding an additional filter attribut to your request: ```filterby=...```
More filter options can be found in the [Filter section](https://developers.awork.io/#api-description).
```
https://api.awork.io/api/v1/users?filterby=firstname eq 'John'
```
In this example, you can filter all users and only return those that have the firstname John.
If you want to filter a list of objects, like the members of a project, you can do so like this:
```
https://awork.io/api/v1/projects?filterby=members/any(p: p\FirstName eq 'Neil')
```
In this example only projects get returned that have a member with the first name Neil.

### Can I find deleted data via the API?
No, deleted data cannot be requested from the API. Instead of deleting data completly, we recommend using the archiving option whenever possible.

![Logo](https://www.awork.io/wp-content/uploads/2019/01/aworkLogoB-1.svg)

### Does awork provide webhooks so I can sync changes?
Yes, you can create webhooks in your webapp. More infos about this can be found in our help center under https://support.awork.io/hc/en-us/articles/360002809719-Webhooks

Each webhook works for your whole workspace, so on the project added webhook, you get events for all projects added to your workspace, no matter who created it or to which team it belongs.

The supported event types include:
- Client added
- Client deleted
- File added
- File deleted
- Project added
- Project comment added
- Project deleted
- Project member added
- Project member deleted
- Project status changed
- Project task added
- Project task deleted
- Task assignment added
- Task assignment deleted
- Task comment added
- Task status changed
- Time tracking added
- Time tracking deleted
- User activation changed
- User added
- User deleted

## Code Examples

- [NodeJS examples](./examples/nodejs)

- [C# examples](./examples/csharp)

- [Python3 examples](./examples/python)

## API Clients (third party)
- https://www.npmjs.com/package/@brandboostinggmbh/awork-sdk
- https://github.com/timkley/awork-php-sdk
