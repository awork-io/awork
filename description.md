# Description

### Request Structure

The awork API is available via HTTPS endpoints and follows a RESTful address structure where resources are selected with text and Id segments in the URL. Typically Ids are in Guid format, i.e. a hexadecimal representation of a 128-bit integer separated by hyphens.\
Other values are usually sent in the body of the request, which are only accepted in JSON format (content type: `application/json`).

The URL of our API is composed of three different segments:

* The base URL: `https://api.awork.com/api/v1`
* The content/resource url: `/users`
* The filter query (optional): `?page=1&pageSize=50`

The complete URL can look like this: `https://api.awork.com/api/v1/users?page=1&pageSize=50`

### CRUD Calls vs. Business Operations

Most API calls contain simple _CRUD_ endpoints to handle the data manipulation for that particular entity. In some cases the default POST, PUT, or DELETE routes are replaced by so-called _business operations_. This separation is because actions do not only manipulate the entity itself but also affect other entities or even trigger further actions, workflows, or events in other parts of awork. An example of this would be an automatic task creation triggered by the status change of a project.

Business operations can be identified by an additional segment in the URL, which usually begins with a verb. For example:

* `setArchived`
* `removeProjectMember`
* `renameTag`
* `setStatus`

### Deleted vs. Archived

In some cases, deleting an object can have unintended side effects because of the dependencies of other objects. An example of this is the project type. Once you’ve linked projects to a particular type, it can be complicated to delete the type because you will have to move all projects using that specific type to another type. For these cases, you can set that particular object to _archived_, which is a form of soft-deletion. Once flagged as archived, it can no longer be used but still exists for the legacy data that it is already linked to.
