# Rate Limits

The awork API limits the number of requests external API clients can make to a workspace. These limits depend on the plan of the workspace. The limits are shared by all external client applications across the workspace.

| Plan       | Limit                   |
| ---------- | ----------------------- |
| Premium    | 1000/minute, 500/second |
| Enterprise | 3000/minute, 500/second |

Other limits can apply to certain endpoints or can be introduced temporarily to provide a reliable service quality.

The API responds with `429 Too Many Requests` when the limit has been reached. The response also contains headers that explain the rate limit, including the time until the limit resets, in seconds (`RateLimit-Reset`).

```
RateLimit-Limit: 500
RateLimit-Remaining: 499
RateLimit-Reset: 47
X-RateLimit-Limit-Second: 500
X-RateLimit-Remaining-Second: 499
X-RateLimit-Limit-Minute: 1000
X-RateLimit-Remaining-Minute: 999
```

We recommend developers of client applications to read these header values and use a back-off time to fail gracefully and wait for the limit to reset to continue making requests.
