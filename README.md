# Keycloak Bulk

A bulk operation tool for the Keycloak identity manager.

## Getting Started

### 1. Create OIDC client

Create a new Client on your Keycloak.

- Client ID: `keycloak-bulk`
- Client Protocol: openid-connect
- Access Type: confidential
- Valid Redirect URIs: `https://keycloak-bulk.example.com/signin/callback`

### 2. Run server

Set the following environment variables:

Name | Value | Example
-----|-------|--------
`OIDC_ISSUER`         | Issuer URL (mandatory) | `https://keycloak.example.com/auth/realms/YOUR_REALM`
`OIDC_CLIENT_ID`      | Cliend ID (mandatory) | `keycloak-bulk`
`OIDC_CLIENT_SECRET`  | Client secret (mandatory) | `80a00dd6-7419-44a1-864d-ac8e44ebf68e`
`JWT_SECRET`          | Signing key for a session token, defaults to random bytes | `affd7360-3591-4cb7-9baa-a386a77ced58`

Run a container.

```bash
# Docker
docker run --rm -p 5000:5000 \
  -e OIDC_ISSUER=https://keycloak.example.com/auth/realms/YOUR_REALM \
  -e OIDC_CLIENT_ID=keycloak-bulk \
  -e OIDC_CLIENT_SECRET=your-secret \
  int128/keycloak-bulk

# Kubernetes
kubectl apply -f kubernetes.yaml
```

Open http://localhost:5000.

## Contribution

This is an open source software licensed under Apache License 2.0.

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
