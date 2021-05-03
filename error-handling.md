# Error Handling

In case a request to our API fails, the return value of the endpoints follows standard HTTP status code conventions. 

A detailed reason can be found in the response. Common codes indicating a client error are 400 \(Bad Request\) & 404 \(Not Found\). 

To give some further information on the cause of the error the API also returns a standardised error object in the response body.

```aspnet
{
    "code": "validation-failed",
    "description": "The model sent in the request is invalid. See the validation errors for details.",
    "link": "https://developers.awork.io/#response-types",
    "space": "On Venus a day is longer than a year.",
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

* **Description**: A human-readable explanation for the cause of the error. For example:
  * Identity cannot be invited to this workspace. The identity is already part of the workspace.
  * The password is too simple
* **Space:** An interesting fact about space.
* **Link:** A link to the corresponding documentation.
* **Details:** Further explanations or hints on fixing the request.
* **ValidationErrors:** If the model validation failed, all violations are listed here.

| Description |  |
| :--- | :--- |
| workspaceid-missing  | The request is missing a valid team id. Most likely your token is invalid. |
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

