# The awesome doc-service

## Setup

```bash
npm install
npm start
```

## Development

```bash
npm run test:watch
```

## Configuration via Environment-Variables

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
NODE_ENV=
MYAPP_USERNAME=
MYAPP_PASSWORD=
MYAPP_COUCHDB_USERS_URL=
MYAPP_COUCHDB_DOCS_URL=
SERVICE_PORT=
```

## How to

### Create a self-signed certificate

```bash
ssh-keygen -f psx
openssl req -new -key psx -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey psx -out psx.cert
rm csr.pem
```