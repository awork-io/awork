# awork.io
[awork](https://www.awork.io/) is an awesome work management tool that helps you be more productiv. Next to a [webapp](https://app.awork.io/) and an app for [IOS](https://apps.apple.com/de/app/awork-organisiere-dein-team/id1466945183) and [Android](https://play.google.com/store/apps/details?id=io.awork&hl=gsw&gl=US), we also provide a rich API that enables external developers to integrate awork into their workflows.
In this github repo you will find important infos, a FAQ with the most frequently asked questions and code examples that helps you get started even faster.

Detailed infos about the API can be found under: https://developers.awork.io/

## FAQ

### What is the easiest option for authorization for the API?
The awork API needs authentification for most endpoints. The easiest way for authentification is to use Basic Auth with a Bearer token which you can create in your awork application: [Client Applications and API Keys](https://support.awork.io/hc/en-us/articles/360002815960-Client-Applications-and-API-Keys)

The other option would be to use OAuth 2.0: https://developers.awork.io/#authentication

### Does the API has pagination?
Yes, the awork API has pagination which can be found in the Pagition section under [API Description](https://developers.awork.io/#api-description). You can add pagination behind your query by adding the page and pageSize attribute like this:
```
https://api.awork.io/api/v1/users?page=1&pageSize=50
```
Now you can reach the next page by setting page=2 and keeping the page size the same. The limit for the page size is 1000 entries.
