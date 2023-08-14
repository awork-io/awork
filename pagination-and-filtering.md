# Pagination

#### Why pagination? <a href="#paginationintherestapi-whypagination" id="paginationintherestapi-whypagination"></a>

To obtain data, you have to make calls to the REST API. The response of such a call can lead to a huge data set. To avoid this, awork smartly paginates the responses so that they are flexible and easier for users to handle.\
For example, if you get all the projects, the response could end up with hundreds or thousands of projects and their details which, certainly creates a bad experience for your users. To avoid this, a built-in default limit on the server response is set, which varies on which data you are trying to retrieve. The limit is configurable, i.e., you can specify the number of results that you would like to receive from the server.

#### How to configure the limit? <a href="#paginationintherestapi-whypagination" id="paginationintherestapi-whypagination"></a>

You can set the number of items that you would like to get from the API via two properties: page and pageSize.

For example, if you want to get 50 users, you would end up making a call with the following url: `/users?page=1&pageSize=50`.\
When you make a call to retrieve the users from the API, you get the response as well as its headers. The headers of the response contain a property named `aw-totalitems`, which provides the information about the maximum retrievable results.

| Name       | Type            | Description                                                      |
| ---------- | --------------- | ---------------------------------------------------------------- |
| `page`     | integer (query) | The current page number                                          |
| `pageSize` | integer (query) | How many items should be returned on each page. Maximum of 1000. |

The following response headers are returned on paginated endpoints:

| Name            | Type    | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `aw-page`       | integer | The current page                                |
| `aw-totalitems` | integer | The total items available (considering filters) |
| `aw-items`      | integer | The items in the current page                   |
| `aw-pagesize`   | integer | The current page size. 1000 by default.         |

