# Authentication

You have two options to access our api. 

* Fixed token generated in the ui which is permanent valid, but is not user specific. This makes sense for background synchronisation applications. Details explained [here](https://support.awork.io/hc/de/articles/360002815960-Client-Applications-und-API-Keys).
* OAuth 2

```aspnet
// The token can be used in the Authorization Header:
Authorization: Bearer {access_token}
```

## OAuth Flow

#### Client Application <a id="Authentication-ClientApplication"></a>

A client application needs to be registered before you can make API calls. Go to the workspace settings panel in awork and add a new client application. You will be asked to provide a unique name and a display name for your client. You will receive a client secret in return.

The client secret is only shown while creating the client application! It can be regenerated, but all clients will loose access then.

**Client Id**

The `client_id` is used to identify your client application. After you registered a client application, you’ll find the `client_id` in the list of client applications in the workspace settings panel.

**Client Secret**

The `client_secret` is generated in the client applications section of awork. It is located next to the `client_id` in the workspace settings page. The secret will be used to authenticate your client application when you request a token.

The client secret is only displayed when creating the client application! It can be regenerated, but all clients will lose access when their tokens expire.

#### Scopes <a id="Authentication-Scopes"></a>

The OAuth 2.0 authentication flow uses scopes to define which rights are granted to the application by the user. Scopes are sent as a space separated list. The API currently supports these scopes:

* `offline_access`: continued access, issues a refresh token.

### Tokens

**Access Token**

The `Access Token` is used to authenticate yourself with the API resources. It needs to be included in every request to the API. Each user has to use their own unique `Access Token`, since such tokens are only valid for the associated user. Also, Access Tokens are valid for one workspace only. If the client application wants to access multiple workspaces, it needs to request separate tokens. The token is usually valid for a few days only.

**Refresh Token**

The `Refresh Token` is used to get a new `Access Token`, once it has expired. A `Refresh Token` only expires when the user manually revokes access for the client application.

**Authorization Code**

The `Authorization Code` is a transitory code to retrieve an `Access Token`. It should not be stored in the client application.

#### Endpoints <a id="Authentication-Endpoints"></a>

The OAuth endpoints are required to get an `Access Token` and exchange a `Refresh Token` for a new `Access Token`:

**`Authorization Endpoint:`** `/accounts/authorize` may be used to initially retrieve an Authorization Code.

**`Token Endpoint:`** `/accounts/token` may be used to retrieve an Access Token from either an Authorization Code or a Refresh Token.

### Authorization Code Flow <a id="Authentication-AuthorizationCodeFlow"></a>

#### Authorization Request <a id="Authentication-AuthorizationRequest"></a>

The client constructs the request URI by adding the following parameters to the query string of the authorization endpoint URI using the `application/x-www-form-urlencoded` format. The client directs the user to the constructed URI using a browser window. The user is prompted to log in, enter her or his username and password, and grant the requested permissions to the client application. If the user is part of several workspaces in awork, the user needs to select the workspace before authorizing the application.

**Parameter:**

* `client_id`: The client Id of the client application. Required.
* `redirect_uri`: The user will be redirected to a custom URI after the access was granted. Needs to be the same as specified when registering the client application. Required.
* `scope`: A space-separated list of API scopes. Required.
* `state`: An arbitrary state string that helps the client application to identify the request. Optional.

```text
https://api.awork.io/api/v1/accounts/authorize?client_id={client_id}&response_type=code&grant_type=authorization_code&redirect_uri={redirect_uri}&state={state}&scope={scope}
```

**Note:** The generated URL needs to be opened in a browser window. the user has to log in to authorize the application.

All query parameters \(especially the `redirect_uri`\) may be properly URL-encoded.

#### User Authentication <a id="Authentication-UserAuthentication"></a>

The user logs in and grants or revokes the authorization request.

#### Authorization Response <a id="Authentication-AuthorizationResponse"></a>

If the user grants the authorization request, the authorization server issues an authorization code and delivers it to the client by adding the following parameters to the query string of the redirection URI using the `application/x-www-form-urlencoded`format.

**Parameter:**

* `redirect_uri`: The previously specified redirect URI.
* `code`: The authentication code that can be exchanged for a token later.
* `state`: The same arbitrary state string that the client application passed in the authorization request earlier.

| `302 Found{redirect_uri}?code={code}&state={state}` |
| :--- |


#### Access Token Request <a id="Authentication-AccessTokenRequest"></a>

If the client application has been successfully authorized, it sends a request with the following parameters in the body to the token endpoint using the `application/x-www-form-urlencoded` format.

**Parameter:**

* `code`: The code that was received in the previous authorization response. Required.
* `redirect_uri`: The previously specified redirect URI. Required.
* `client_id`: The client Id of the client application. Required.
* `client_secret`: The client secret of the client application. Required.

**Note:** To build a proper HTTP Authorization header for [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), you need to encode your `client_id` and `client_secret` using [Base64](https://en.wikipedia.org/wiki/Base64), and add it to the `Authorization` header as follows: `Authorization: Basic Base64({AppId}:{AppSecret})`

```text
POST https://api.awork.io/api/v1/accounts/tokenredirect_uri={redirect_uri}  &grant_type=authorization_code  &code={code}Authorization: Basic Base64({client_id}:{client_secret})
```

**Note:** All query parameters \(especially the `redirect_uri`\) should be properly URL-encoded.

#### Access Token Response <a id="Authentication-AccessTokenResponse"></a>

If the access token request is valid and authorized, the authorization server issues an Access Token and Refresh Token. If the request failed or is invalid, the authorization server returns an error response.

```text
{
    "access_token": "eyJhbGciOiJ...",
    "token_type": "Bearer",
    "resource": "awork.io",
    "expires_in": 86400,
    "refresh_token": "eyJhbGciOiJ..."
}
```

After receiving the Access Token, you can use it to request resources from the API.

#### Resource Request <a id="Authentication-ResourceRequest"></a>

To receive resources from the API, add the Access Token to the Authorization header in the following form:

```text
Authorization: Bearer {access_token}
```

**Note**: Access Tokens expires and needs to be refreshed with the Refresh Token.

