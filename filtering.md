# Filtering

The awork API supports a huge set of filters that can be executed on all our API controllers.

Every filter can be applied by adding a `filterby` expression to the request URL:

```
 https://awork.io/api/v1/users?filterby=FirstName eq 'Sebastian'
```

{% hint style="info" %}
Important: Special characters (like `?`, `&` and `=`) within a string filter value need to be properly url encoded.&#x20;

<pre><code><strong>filterby=name eq 'awork %26 co' &#x3C;- correct
</strong><strong>filterby=name eq 'awork &#x26; co' &#x3C;- incorrect
</strong></code></pre>
{% endhint %}

If you want to filter by a nested property, you can do this by separating the Properties by `/`.



### Logical Operations

You can invert the expression by using `not` before the statement

```
 https://awork.io/api/v1/users?filterby=not FirstName eq 'Sebastian'
```

Furthermore, you can combine expressions using the logical operator `and`

```
https://awork.io/api/v1/products?filterby=Price le 200 and Price gt 3.5 
```

You can combine expressions using the logical operator `or`

```
https://awork.io/api/v1/products?filterby=Price le 200 or Price gt 300 
```

**Precedence** is defined with `(` and `)`



### Data types

{% hint style="info" %}
The data types DateTime and Guid have to be prefixed with the corresponding type identifier `datetime` and `guid`, respectively, e.g.

* `https://awork.io/api/v1/users?filterby=birthDate ge datetime'2018-04-03T00:00'`
* `https://awork.io/api/v1/users?filterby=id eq guid'12345678-aaaa-bbbb-cccc-ddddeeeeffff'`&#x20;
{% endhint %}

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



### Operators

| Operator     | Description                                                                                                                                                                    | Query                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `eq`         | The 'eq' operator filters and returns the items which matches the filter term.                                                                                                 | https://awork.io/api/v1/users?filterby=firstname eq 'Neil'                      |
| `ne`         | The 'ne' operator filters and returns the items which do not match the filter term.                                                                                            | https://awork.io/api/v1/users?filterby=firstname ne 'Neil'                      |
| `endswith`   | The 'endswith' operator filters and returns the items which end with the filter term.                                                                                          | https://awork.io/api/v1/users?filterby=endswith(FirstName,'Neil')               |
| `startswith` | The 'startswith' operator filters and returns the items which start with the string.                                                                                           | https://awork.io/api/v1/users?filterby=startswith(FirstName,'Neil')             |
| `contains`   | The 'contains' operator filters and returns the items which contain the filter term.                                                                                           | https://awork.io/api/v1/users?filterby=substringof('Neil',FirstName)            |
| `gt`         | The 'gt' operator filters and returns the items which are greater than the filter term.                                                                                        | https://awork.io/api/v1/users?filterby=birthDate gt datetime'2018-04-03T00:00'  |
| `lt`         | The 'lt' operator filters and returns the items which are less than the filter term.                                                                                           | https://awork.io/api/v1/users?filterby=birthDate lt datetime'2018-04-03T00:00'  |
| `le`         | The 'le' operator filters and returns the items which are less than or equal to the filter term.                                                                               | https://awork.io/api/v1/users?filterby=birthDate le datetime'2018-04-03T00:00'  |
| `ge`         | The 'ge' operator filters and returns the items which are greater than or equal to the filter term.                                                                            | https://awork.io/api/v1/users?filterby=birthDate ge datetime'2018-04-03T00:00'  |
| `any`        | The any operator iterates through the main entity (Project), executes the condition and returns the filtered list of projects where any member with a FirstName 'Neil' exists. | https://awork.io/api/v1/projects?filterby=members/any(p: p/FirstName eq 'Neil') |
| `count`      | The count operator iterates through the main entity (Project), and returns the filtered list of projects that have less than 10 members.                                       | https://awork.io/api/v1/projects?filterby=members/count() lt 10                 |



#### Special Operator for the Current User

| Term       | Description                  |
| ---------- | ---------------------------- |
| `eq me.id` | Filters for the current user |



#### Special Operators for Date and Time&#x20;

| Term       | Description                             |
| ---------- | --------------------------------------- |
| `lt now`   | Filters for less than current date-time |
| `gt sow`   | Filters for greater than start of week  |
| `gt eow`   | Filters for greater than end of week    |
| `gt som`   | Filters for greater than start of month |
| `gt eom`   | Filters for greater than end of month   |
| `eq today` | Filters for today                       |
