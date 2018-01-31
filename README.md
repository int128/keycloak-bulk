# keycloak-bulk

TODO

## Getting Started

TODO

## Contribution

### Development

Create a new Client on your Keycloak.

- Client ID: `keycloak-bulk`
- Client Protocol: openid-connect
- Access Type: confidential
- Valid Redirect URIs: http://localhost:3000/signin/oidc

Create dotenv:

```bash
# /apiserver/.env
OIDC_ISSUER=https://keycloak.example.com/auth/realms/YOUR_REALM
OIDC_CLIENT_ID=keycloak-bulk
OIDC_CLIENT_SECRET=****
```

Start the API server:

```bash
cd api
npm start
```

Start the frontend:

```bash
cd frontend
npm start
```

Open http://localhost:3000.
