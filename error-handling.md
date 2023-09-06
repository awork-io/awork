# Error Handling

In case a request to our API fails, the return value of the endpoints follows standard HTTP status code conventions.&#x20;

A detailed reason can be found in the response. Common codes indicating a client error are 400 (Bad Request) & 404 (Not Found).&#x20;

To give some further information on the cause of the error, the API also returns a standardized error object in the response body.

```aspnet
{
    "code": "validation-failed",
    "description": "The model sent in the request is invalid. See the validation errors for details.",
    "link": "https://developers.awork.com/#response-types",
    "details": [
        "Some more details about the error can go here.",
        "Or here."
    ],
    "validationErrors": [
        {
            "property": "Name",
            "message": "'Name' should not be empty."
        }
    ]
}
```

* **Description**: A human-readable explanation for the cause of the error.\
  For example:
  * Identity cannot be invited to this workspace. The identity is already part of the workspace.
  * The password is too simple
* **Link:** A link to the corresponding documentation.
* **Details:** Further explanations or hints on fixing the request.
* **ValidationErrors:** If the model validation failed, all violations are listed here.

<table data-header-hidden><thead><tr><th width="332">Description</th><th></th></tr></thead><tbody><tr><td>Error code</td><td>Description</td></tr><tr><td><code>workspaceid-missing</code><br></td><td>The request is missing a valid team id. Most likely, your token is invalid.</td></tr><tr><td><code>not-found</code></td><td>The requested resource could not be located.</td></tr><tr><td><code>entity-archived</code></td><td>The request tried to perform an operation with an archived entity.</td></tr><tr><td><code>duplication-violation</code></td><td>A property that requires a unique value detected a duplication.</td></tr><tr><td><code>database-commit</code></td><td>The commit to the database failed. Your changes have not been committed!</td></tr><tr><td><code>concurrency-violation</code><br></td><td>Concurrent processes changed data and created conflicts in the process.</td></tr><tr><td><code>date-dependency</code></td><td>Two or more date values are in violation with each other (e.g. start date after due date).</td></tr><tr><td><code>date-out-of-range</code><br></td><td>A single date value is not in its validity range (e.g. birth date in the future).</td></tr><tr><td><code>value-out-of-range</code></td><td>A value is not in its defined range of validity (e.g. negative prices).</td></tr><tr><td><code>invalid-operation</code></td><td>The request would have caused an illegal data state.</td></tr><tr><td><code>invalid-model</code><br></td><td>The body of the request is invalid or empty.</td></tr><tr><td><code>validation-failed</code><br></td><td>The model validation of the request failed.</td></tr><tr><td><code>server-error</code></td><td>An internal error occurred.<br></td></tr><tr><td><code>already-exist-error</code></td><td>The request adds an entity which already exists.</td></tr><tr><td><code>invalid-filter-or-order</code></td><td>The request contains an invalid filter or sort statement.<br></td></tr><tr><td><code>illegal-property-transition</code></td><td>The request would cause a value transition which is not allowed.</td></tr><tr><td><code>unauthorized</code></td><td>The owner of the request has insufficient permissions.</td></tr><tr><td><code>invalid-batch-operation</code></td><td>The request for a batch operations is invalid.</td></tr><tr><td><code>deactivated-user</code></td><td>The request tried to perform an operation with a deactivated user.</td></tr><tr><td><code>request-body-too-large</code></td><td>The uploaded file exceeds the allowed size limit</td></tr><tr><td><code>insufficient-subscription-level</code></td><td>Your team does not have the required subscription level to use this feature. Upgrade to a higher plan.</td></tr><tr><td><code>insufficient-seats</code></td><td>Your team does not have enough remaining seats while trying to invite or activate users.</td></tr></tbody></table>

### HTTP Status Codes

On each request to our API, you will receive a response with a HTTP status code that indicates if it was successful.

#### Success Status Codes

```
GET           200 (OK) including the object(s)
POST          200 (OK) including the newly created object
              202 (Accepted) for batch or background operations
              204 (No Content) for business operations without a return value
PUT           200 (OK) including the updated object
DELETE        204 (No Content)
```

#### Client Failure Status Codes

```
400 (Bad Request)   When the request model is invalid or the operation is not allowed
401 (Unauthorized)  When the requesting user is lacking the necessary permissions for the request
404 (Not Found)     When a requested resource does not exist
```
