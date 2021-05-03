# Description

### Request Structure

The awork API is available via HTTPS endpoints and follows a RESTful address structure where resources are selected with text and Id segments in the URL. Typically Ids are in Guid format, i.e. a hexadecimal representation of a 128-bit integer separated by hyphens.  
Other values are usually sent in the body of the request, which are only accepted in JSON format \(content type: `application/json`\).

The URL of our API is composed of three different segments:

* The base URL: https://api.awork.io/api/v1
* The content/resource url: /users
* The filter query \(optional\):?page=1&pageSize=50

The complete URL can look like this: https://api.awork.io/api/v1/users?page=1&pageSize=50

### CRUD Calls vs. Business Operations

Most API calls contain simple _CRUD_ endpoints to handle the data manipulation for that particular entity. In some cases the default POST, PUT or DELETE routes are replaced by so-called _business operations_. The reason for this separation is that actions do not only manipulation the entity itself, but also affect other entities or even trigger further actions, workflows or events in other parts in awork. An example for this would be an automatic task creation triggered by the status change of a project.

Business operations can be identified by an additional segment in the URL, which usually begins with a verb. For Example:

* setArchived
* removeProjectMember
* renameTag
* setStatus
* etc.

### Deleted vs. Archived

In some cases, deleting an object can have unintended side effects because of dependencies of other objects. An example for this is the project type. Once you’ve linked projects to a particular type, it can be complicated to delete the type because you will have to move all projects using that type to another type. For these cases you can set that particular object to _archived_, which is a form of soft-deletion. Once flagged as archived, it can no longer be used, but still exists for legacy data it is already linked to.

### Error Handling

In case a request to our API fails, the return value of the endpoints follows standard HTTP status code conventions. A detailed reason can be found in the response. Common codes indicating a client error are 400 \(Bad Request\) & 404 \(Not Found\). To give some further information on the cause of the error the API also returns a standardized error object in the response body:

| `{  "code": "validation-failed",   "description": "The model sent in the request is invalid. See the validation errors for details.",   "link": "https://developers.awork.io/#response-types", "space": "On Venus a day is longer than a year.", "details": [     "Some more details about the error can go here.",    "Or here."  ]  "validationErrors": [     {      "property": "Name",       "message": "'Name' should not be empty."    }  ]}` |
| :--- |


* **Code:** These string error-codes are constants indicating the exact misbehaviour. The following codes are in use:

Search:

| Code  | Description |
| :--- | :--- |
| teamid-missing  | The request is missing a valid team id. Most likely your token is invalid. |
| not-found | The requested resource could not be located. |
| entity-archived | The request tried to perform an operation with an archived entity. |
| duplication-violation | A property that requires a unique value detected a duplication. |
| database-commit | The commit to the database failed. Your changes have not been commited! |
| concurrency-violation  | Concurrent processes changed data and created conflicts in the process. |
| date-dependency | Two or more date values are in violation with each other \(e.g. start date after due date\). |
| date-out-of-range  | A single date value is not in its validity range \(e.g. birth date in the future\). |
| value-out-of-range | A value is not in its defined range of validity \(e.g. negative prices\). |
| invalid-operation | The request would have caused an illegal data state. |
| invalid-model  | The body of the request is invalid or empty. |
| validation-failed  | The model validation of the request failed. |
| server-error | An internal error occured.  |
| already-exist-error | The request adds an entity which already exists. |
| invalid-filter-or-order  | The request contains an invalid filter or sort statement.  |
| illegal-property-transition  | The request would cause a value transition which is not allowed. |
| unauthorized | The owner of the request has insufficient permissions. |
| invalid-batch-operation | The request for a batch operations is invalid. |
| deactivated-user | The request tried to perform an operation with a deactivated user. |
| request-body-too-large | The uploaded file exceeds the allowed size limit |
| insufficient-subscription-level | Your team does not have the required subscription level to use this feature. Upgrade to a higher plan. |
| insufficient-seats | Your team does not have enough remaining seats while trying to invite or activate users. |

Showing 1 to 22 of 22 entries

* **Description**: A human-readable explanation for the cause of the error. For example:
  * Identity cannot be invited to this workspace. The identity is already part of the workspace.
  * The password is too simple
* **Space:** An interesting fact about space.
* **Link:** A link to the corresponding documentation.
* **Details:** Further explanations or hints on fixing the request.
* **ValidationErrors:** If the model validation failed, all violations are listed here.

### HTTP Status Codes

On each request to our API you get a response with a HTTP status code that indicates if it was successful.

#### Success Status Codes

```text

GET           200 (OK) including the object(s)
POST          200 (OK) including the newly created object
              202 (Accepted) for batch or background operations
              204 (No content) for business operations without a return value
PUT           200 (OK) including the updated object
DELETE        204 (No content)

```

#### Client Failure Status Codes

```text

400 (Bad request)   When the request model is invalid or the operation is not allowed
401 (Unauthorized)  When the requesting user is lacking the necessary permissions for the request
404 (Not found)     When a requested resource does not exist
```

### Pagination

#### Why pagination? <a id="PaginationintheRESTAPI-Whypagination?"></a>

To obtain data, you have to make calls to the REST API. The response of such a call can lead to a huge data set. To avoid this, awork smartly paginates the responses so that they are flexible and easier for users to handle.  
For example, if you get all the projects, the response could end up with hundreds or thousands of projects and their details which, certainly creates a bad experience for your users. To avoid this, a built-in default limit on the server response is set which varies on which data you are trying to retrieve. The limit is configurable, i.e. you can specify the number of results that you would like to receive from the server.

#### How to configure the limit? <a id="PaginationintheRESTAPI-Whypagination?"></a>

You can set the number of items that you would like to get from the API via two properties: page and pageSize.

For example, if you want to get 50 users you would end up making a call with the following url: https://api.awork.io/api/v1/users?page=1&pageSize=50.  
Show 102550100 entriesSearch:

| Name | Type | Description |
| :--- | :--- | :--- |
| page | integer \(query\) | The number of the current page. |
| pageSize | integer \(query\) | The number of items on this page. |
| orderby | string \(query\) | Define if the items are ordered by ascending or descending. |

Showing 1 to 3 of 3 entriesPreviousNext

#### How to find the total number of results? <a id="PaginationandFiltering-Filtering"></a>

When you make a call to retrieve the users from the API, you get the response as well as its headers. The headers of the response contain a property named “aw-totalitems”, which provides the information about the maximum retrievable results.

#### Any smart options? <a id="PaginationandFiltering-Filtering"></a>

You can sort as well as filter the data that you would like to get from the API by specifying the properties sortby and order.

### Filter

The API uses a subset of the query syntax from ODATA, so most of the common queries will be compatible.Search:

| Operator | Description | Example |
| :--- | :--- | :--- |
| eq | The eq operator filters and returns the items which matches the expression. | https://awork.io/api/v1/users?filterby=firstname eq 'Neil' |
| ne | The ne operator filters and returns the items which do not match the expression. | https://awork.io/api/v1/users?filterby=firstname ne 'Neil' |
| endswith | The endswith operator filters and returns the items which end with the string. | https://awork.io/api/v1/users?filterby=endswith\(FirstName, 'Neil' \) |
| startswith | The startswith operator filters and returns the items which start with the string. | https://awork.io/api/v1/users?filterby=startswith\(FirstName, 'Neil' \) |
| contains | .The contains operator filters and returns the items which contain the string | https://awork.io/api/v1/users?filterby=substringof\('Neil',FirstName\) |
| gt | The gt operator filters and returns the items which are greater than the expression. | https://awork.io/api/v1/users?filterby=birthDate gt datetime'2018-04-03T00:00' |
| lt | The lt operator filters and returns the items which are less than the expression. | https://awork.io/api/v1/users?filterby=birthDate lt datetime'2018-04-03T00:00' |
| le | The le operator filters and returns the items which are less than or equal to the expression. | https://awork.io/api/v1/users?filterby=birthDate le datetime'2018-04-03T00:00' |
| ge | The ge operator filters and returns the items which are greater than or equal to the expression. | https://awork.io/api/v1/users?filterby=birthDate ge datetime'2018-04-03T00:00' |
| any | The any operator iterates through the main entity \(Project\), executes the condition and returns the filtered list of projects whose any member with the first name Neil. | https://awork.io/api/v1/projects?filterby=members/any\(p: p\FirstName eq 'Neil'\) |
| all | The all operator iterates through the main entity \(Project\), and returns the filtered list of projects where all members have the first name Neil. | https://awork.io/api/v1/projects?filterby=members/all\(p: p\FristName eq 'Neil'\) |
| count | The count operator iterates through the main entity \(Project\) and returns the filtered list of projects that have less than 10 members. | https://awork.io/api/v1/projects?filterby=members/count\(\) lt 10 |
| min | The min operator iterates through the time entries of a projects, computes the minimum tracked time on the project and returns the filtered list if the minimum value is greater than one hour. | https://awork.io/api/v1/projects/timetrackings?filterby=duration/min\(\) gt 3600 |
| max | The max operator iterates through the time entries of a projects, computes the maximum tracked time on the project and returns the filtered list if the maximum value is equal to one hour. | https://awork.io/api/v1/projects/timetrackings?filterby=duration/max\(\) eq 3600 |
| sum | The sum operator iterates through the time entries of a project, computes the sum and returns the filtered list of projects where the sum is greater than one hour. | https://awork.io/api/v1/projects/timetrackings?filterby=duration/sum\(\) gt 3600 |
| average | The average operator iterates through the time entries of a projects, computes the average and returns the filtered list of projects where the average is greater than one hour. | https://awork.io/api/v1/projects/timetrackings?filterby=duration/average\(\) gt 3600 |

Showing 1 to 16 of 16 entries

