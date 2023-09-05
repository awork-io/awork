#!/usr/bin/env python3
#
# a simple example to query the API of awork.com with Python3 and OAuth2.0
# 
# Website: https://www.awork.com/
# Docs: https://developers.awork.com/
# Forked from: https://requests-oauthlib.readthedocs.io/en/latest/examples/outlook.html
#
# Hint: pip3 install requests_oauthlib
#

# Import libraries
from requests_oauthlib import OAuth2Session

# This information is obtained during setup of a new Client Application
CLIENT_ID = '<your client id>'
CLIENT_SECRET = '<your client secret>'

# OAuth endpoints & params from API Description (https://developers.awork.com/)
AUTHORIZATION_BASE_URL = 'https://api.awork.com/api/v1/accounts/authorize'
TOKEN_URL = 'https://api.awork.com/api/v1/accounts/token'
SCOPE = ['offline_access']
REDIRECT_URI = 'https://www.awork.com'

# Merge the OAuth session string
awork = OAuth2Session(CLIENT_ID, scope=SCOPE, redirect_uri=REDIRECT_URI)

# Redirect owner to OAuth provider using URL with a few key OAuth parameters
authorization_url, state = awork.authorization_url(AUTHORIZATION_BASE_URL)
print('Please go here and authorize:', authorization_url)
print()

# Get the authorization verifier code from the callback url
redirect_response = input('Paste the full redirect URL here: ')

# Fetch the access token
token = awork.fetch_token(TOKEN_URL, client_secret=CLIENT_SECRET, authorization_response=redirect_response)
print()
print(token)
print()

# Fetch a protected resource, i.e. all users
response = awork.get('https://api.awork.com/api/v1/users')
print(response.content)