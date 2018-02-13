# Keycloak Bulk

A bulk operation tool for the Keycloak identity manager.

## Getting Started

Create a new Client on your Keycloak.

- Client ID: `keycloak-bulk`
- Client Protocol: openid-connect
- Access Type: confidential
- Valid Redirect URIs: https://keycloak-bulk.example.com/signin/callback

Run on Docker:

```bash
docker run --rm -p 3000:3000 \
  -e OIDC_ISSUER=https://keycloak.example.com/auth/realms/YOUR_REALM \
  -e OIDC_CLIENT_ID=keycloak-bulk \
  -e OIDC_CLIENT_SECRET=your-secret \
  int128/keycloak-bulk
```

## Contribution

### Development

Create a new Client on your Keycloak.

- Client ID: `keycloak-bulk`
- Client Protocol: openid-connect
- Access Type: confidential
- Valid Redirect URIs: http://localhost:3000/signin/callback

Create dotenv:

```bash
# /apiserver/.env
OIDC_ISSUER=https://keycloak.example.com/auth/realms/YOUR_REALM
OIDC_CLIENT_ID=keycloak-bulk
OIDC_CLIENT_SECRET=your-secret
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
