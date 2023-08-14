# Authentication

You have two options for accessing our API.&#x20;

* A fixed token generated in the UI, which is permanently valid but is not user-specific. This makes sense for background synchronization applications. You can find more details [here](https://support.awork.io/en/articles/5415664-client-applications-and-api-keys).
* An OAuth 2 flow that allows users to sign in with their own account. This generates a user-specific token which respects all permissions.

```aspnet
// The token can be used in the Authorization Header:
Authorization: Bearer {access_token}
```

## OAuth Flow

#### Client Application <a href="#authentication-clientapplication" id="authentication-clientapplication"></a>

A client application needs to be registered before you can make API calls. Go to the workspace settings panel in awork and add a new client application. You will be asked to provide a unique name and a display name for your client. You will receive a client secret in return.

The client secret is only shown while creating the client application! It can be regenerated, but all clients will then lose access.

**Client Id**

The `client_id` is used to identify your client application. After you register a client application, you'll find the `client_id` in the list of client applications in the workspace settings panel.

**Client Secret**

The `client_secret` is generated in the client applications section of awork. It is located next to the `client_id` on the workspace settings page. The secret will be used to authenticate your client application when you request a token.

The client secret is only displayed when creating the client application! It can be regenerated, but all clients will lose access when their token expires.

#### Scopes <a href="#authentication-scopes" id="authentication-scopes"></a>

The OAuth 2.0 authentication flow uses scopes to define which rights are granted to the application by the user. Scopes are sent as a space separated list. The API currently supports these scopes:

* `offline_access`: continued access, issues a refresh token.

### Tokens

**Access Token**

The `Access Token` is used to authenticate yourself within the API resources. It needs to be included in every request to the API. Each user has to use their own unique `Access Token`, since such tokens are only valid with the associated user. Also, Access Tokens are valid for one workspace only. If the client application wants to access multiple workspaces, it needs to request separate tokens. The token is usually valid for only a few days.

**Refresh Token**

The `Refresh Token` is used to get a new `Access Token` once that one has expired. A `Refresh Token` only expires when the user manually revokes access for the client application.

**Authorization Code**

The `Authorization Code` is a transitory code used to retrieve an `Access Token`. It should not be stored in the client application.

#### Endpoints <a href="#authentication-endpoints" id="authentication-endpoints"></a>

The OAuth endpoints are required to get an `Access Token` and exchange a `Refresh Token` for a new `Access Token`:

**Authorization Endpoint:** `/accounts/authorize` may be used to request user authorization and initially retrieve an `Authorization Code`.

**Token Endpoint:** `/accounts/token` may be used to retrieve an `Access Token` from either an `Authorization Code` or a `Refresh Token`.

### Authorization Code Flow <a href="#authentication-authorizationcodeflow" id="authentication-authorizationcodeflow"></a>

#### Authorization Request <a href="#authentication-authorizationrequest" id="authentication-authorizationrequest"></a>

The client constructs the request URI by adding the following parameters to the query string of the authorization endpoint URI using the `application/x-www-form-urlencoded` format. The client directs the user to the constructed URI using a browser window. The user is prompted to log in, enter her or his username and password, and grant the requested permissions to the client application. If the user is part of several workspaces in awork, the user needs to select the workspace before authorizing the application.

**Parameter:**

* `client_id`: The client Id of the client application. Required.
* `redirect_uri`: The user will be redirected to a custom URI after the access was granted. Needs to be the same as specified when registering the client application. Required.
* `scope`: A space-separated list of API scopes. See the available scopes above. Required.
* `state`: An arbitrary state string that helps the client application identify the request. Optional.

{% code overflow="wrap" %}
```
GET /accounts/authorize?client_id={client_id}&response_type=code&grant_type=authorization_code&redirect_uri={redirect_uri}&state={state}&scope={scope}
```
{% endcode %}

**Note:** The generated URL needs to be opened in a browser window. The user has to log in to authorize the application.

All query parameters (especially the `redirect_uri`) must be properly URL-encoded.

#### User Authentication <a href="#authentication-userauthentication" id="authentication-userauthentication"></a>

The user logs in and can then grant or revoke the authorization request.

#### Authorization Response <a href="#authentication-authorizationresponse" id="authentication-authorizationresponse"></a>

If the user grants the authorization request, the authorization server issues an authorization code and delivers it to the client by adding the following parameters to the query string of the redirection URI using the `application/x-www-form-urlencoded`format.

**Parameter:**

* `redirect_uri`: The previously specified redirect URI.
* `code`: The `Authorization Code` that will be exchanged for an `Access Token` in the next request.
* `state`: The same arbitrary state string that the client application passed in the authorization request earlier.

```
302 Found
Location: {redirect_uri}?code={code}&state={state}
```

#### Access Token Request <a href="#authentication-accesstokenrequest" id="authentication-accesstokenrequest"></a>

If the client application has been successfully authorized, it sends a request with the following parameters in the body to the token endpoint using the `application/x-www-form-urlencoded` format.

**Parameter:**

* `code`: The `Authorization Code` that was received in the previous authorization response. Required.
* `redirect_uri`: The previously specified redirect URI. Required.
* `client_id`: The client Id of the client application. Required.
* `client_secret`: The client secret of the client application. Required.

**Note:** To build a proper HTTP `Authorization` header for [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic\_access\_authentication), you need to encode your `client_id` and `client_secret` using [Base64](https://en.wikipedia.org/wiki/Base64), and add it to the `Authorization` header as follows: `Authorization: Basic Base64({client_id}:{client_secret})`

{% code overflow="wrap" %}
```
POST /accounts/token
Authorization: Basic Base64({client_id}:{client_secret})
Content-Type: application/x-www-form-urlencoded

redirect_uri={redirect_uri}
&grant_type=authorization_code
&code={code}
```
{% endcode %}

**Note:** All query parameters (especially the `redirect_uri`) must be properly URL-encoded.

#### Access Token Response <a href="#authentication-accesstokenresponse" id="authentication-accesstokenresponse"></a>

If the access token request is valid and authorized, the authorization server issues an `Access Token` and `Refresh Token`. If the request failed or is invalid, the authorization server returns an error response.

```
{
    "access_token": "eyJhbGciOiJ...",
    "token_type": "Bearer",
    "resource": "awork.io",
    "expires_in": 86400,
    "refresh_token": "eyJhbGciOiJ..."
}
```

After receiving the `Access Token`, you can use it to request resources from the API.

#### Resource Request <a href="#authentication-resourcerequest" id="authentication-resourcerequest"></a>

To receive resources from the API, add the `Access Token` to the `Authorization` header in the following form:

```
Authorization: Bearer {access_token}
```

**Note**: Access Tokens expires and will need to be refreshed with the `Refresh Token`. See the next step.

#### Refresh Token Request <a href="#authentication-resourcerequest" id="authentication-resourcerequest"></a>

When the `Access Token` has expired, you must use the `Refresh Token` to retrieve a new `Access Token`. The application sends a request with the following parameters in the body to the token endpoint using the `application/x-www-form-urlencoded` format. Same as in the Access Token Request, you need to send the client credentials in the `Authorization` header.

```
POST /accounts/token
Authorization: Basic Base64({client_id}:{client_secret})
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token={refresh_token}
```

#### Refresh Token Response

The authorization server responds with a new `Access Token` and a new expiration.

```
{
    "access_token": "eyJhbGciOiJ...",
    "token_type": "Bearer",
    "expires_in": 86400,
}
```
