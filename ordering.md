# Ordering

The awork API supports ordering for most of the endpoints that return a list of entities. The ordering can be done by adding an _orderby_ expression in the request url.

The following statement orders by the `LastName` property of the users in ascending order. If no ascending `asc` or descending `desc` order is defined, `asc` is chosen as a default.

```
/users?orderby=LastName asc
```

You can also add multiple order statements by listing the properties separated with a `,` . Keep in mind that we do not allow spaces before or after the `,` .

The following url filters by LastName ascending first and then by FirstName descending.

```
/users?orderby=LastName,FirstName desc
```

If you want to order by a nested property, you can do this by separating the Properties by `/` .

```
/projects?orderby=ProjectStatus/Type desc
```
