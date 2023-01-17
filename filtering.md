# Filtering

The awork API supports a huge set of filters that can be executed on all our API controllers.

Every filter can be applied by adding a _filterby_ expression to the request url:

```
 https://awork.io/api/v1/users?filterby=FirstName eq 'Sebastian'
```

You can also combine different expressions. Precedence is defined with '()'.

```
https://awork.io/api/v1/products?filterby=Price le 200 and Price gt 3.5 
```

You can invert the expression by using a _not_ before the statement

```
 https://awork.io/api/v1/users?filterby=not FirstName eq 'Sebastian'
```

{% hint style="info" %}
Important: Characters like ?, & and = within a string filter value need to be properly url encoded.&#x20;
{% endhint %}

```
filterby=name eq 'awork & co' <- incorrect
filterby=name eq 'awork %26 co' <- correct
```

#### Data types

* **Null** null
* **Boolean** true|false
* **Byte** 0x22
* **DateTime** datetime'2000-12-12T12:00'
* **Decimal** 2.345M
* **Double** 2.029
* **Single** 2.0f
* **Guid** guid'12345678-aaaa-bbbb-cccc-ddddeeeeffff'
* **Int** 32
* **Long** 64L
* **String** 'Hello awork'

You can filter by any of the defined operators below or use special operators like:

| Term     | Description                             |
| -------- | --------------------------------------- |
| eq me.id | Filters for the current user            |
| lt now   | Filters for less than current date-time |
| gt sow   | Filters for greater than start of week  |
| gt eow   | Filters for greater than end of week    |
| gt som   | Filters for greater than start of month |
| gt eom   | Filters for greater than end of month   |
| eq today | Filters for today                       |



| Operator   | Description                                                                                                                                                                                      | Query                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| eq         | The 'eq' operator filters and returns the items which matches the filter term.                                                                                                                   | https://awork.io/api/v1/users?filterby=firstname eq 'Neil'                         |
| ne         | The 'ne' operator filters and returns the items which do not match the filter term.                                                                                                              | https://awork.io/api/v1/users?filterby=firstname ne 'Neil'                         |
| endswith   | The 'endswith' operator filters and returns the items which end with the filter term.                                                                                                            | https://awork.io/api/v1/users?filterby=endswith(FirstName,'Neil')                  |
| startswith | The 'startswith' operator filters and returns the items which start with the string.                                                                                                             | https://awork.io/api/v1/users?filterby=startswith(FirstName,'Neil')                |
| contains   | The 'contains' operator filters and returns the items which contain the filter term.                                                                                                             | https://awork.io/api/v1/users?filterby=substringof('Neil',FirstName)               |
| gt         | The 'gt' operator filters and returns the items which are greater than the filter term.                                                                                                          | https://awork.io/api/v1/users?filterby=birthDate gt datetime'2018-04-03T00:00'     |
| lt         | The 'lt' operator filters and returns the items which are less than the filter term.                                                                                                             | https://awork.io/api/v1/users?filterby=birthDate lt datetime'2018-04-03T00:00'     |
| le         | The 'le' operator filters and returns the items which are less than or equal to the filter term.                                                                                                 | https://awork.io/api/v1/users?filterby=birthDate le datetime'2018-04-03T00:00'     |
| ge         | The 'ge' operator filters and returns the items which are greater than or equal to the filter term.                                                                                              | https://awork.io/api/v1/users?filterby=birthDate ge datetime'2018-04-03T00:00'     |
| any        | The any operator iterates through the main entity (Project), executes the condition and returns the filtered list of projects where any member with a FirstName 'Neil' exists.                   | https://awork.io/api/v1/projects?filterby=members/any(p: p/FirstName eq 'Neil')    |
| count      | The count operator iterates through the main entity (Project), and returns the filtered list of projects that have less than 10 members.                                                         | https://awork.io/api/v1/projects?filterby=members/count() lt 10                    |
| min        | The min operator iterates through the time entries of a projects, computes the minimum tracked time on the project, and returns the filtered list if the minimum value is greater than one hour. | https://awork.io/api/v1/projects/timetrackings?filterby=duration/min() gt 3600     |
| max        | The max operator iterates through the time entries of a projects, computes the maximum tracked time on the project, and returns the filtered list if the maximum value is equal to one hour.     | https://awork.io/api/v1/projects/timetrackings?filterby=duration/max() eq 3600     |
| sum        | The sum operator iterates through the time entries of a project, computes the sum, and returns the filtered list of projects where the sum is greater than one hour.                             | https://awork.io/api/v1/projects/timetrackings?filterby=duration/sum() gt 3600     |
| average    | The average operator iterates through the time entries of a projects, computes the average and returns the filtered list of projects where the average is greater than one hour.                 | https://awork.io/api/v1/projects/timetrackings?filterby=duration/average() gt 3600 |
