# Postman Test Guide: Auth + Context API

## Base
- Base URL: `http://127.0.0.1:8000`
- Auth mode: Session cookie (`sessionid`)
- CSRF: enabled

## Local Test Account
- `login_identifier`: `companyhr@gmail.com`
- `password`: `Postman123!`

## Postman Setup
1. Create collection: `AbsensiV1 Auth Context`.
2. Enable cookie jar (default ON).
3. Add collection variable:
   - `base_url` = `http://127.0.0.1:8000`
4. For every POST request, add header:
   - `X-CSRFToken: {{csrf_token}}`
5. Add this test script on `GET {{base_url}}/api/auth/me`:

```javascript
const csrf = pm.cookies.get("csrftoken");
if (csrf) {
  pm.collectionVariables.set("csrf_token", csrf);
}
```

## Scenario 1: Login
- Method: `POST`
- URL: `{{base_url}}/api/auth/login`
- Headers:
  - `Content-Type: application/json`
  - `X-CSRFToken: {{csrf_token}}`
- Body:

```json
{
  "login_identifier": "companyhr@gmail.com",
  "password": "Postman123!"
}
```

- Expected:
  - `200`
  - Body contains:
    - `authenticated: true`
    - `account_user_id`
    - `login_identifier`
  - Cookie jar contains `sessionid` (HttpOnly)
  - Login attempt recorded in `account_login_attempt`

## Scenario 2: Session Check
- Method: `GET`
- URL: `{{base_url}}/api/auth/me`
- Expected:
  - `200`
  - `{"authenticated": true, ...}`

## Scenario 3: Context Fetch
- Method: `GET`
- URL: `{{base_url}}/api/context`
- Expected:
  - `200`
  - Body fields:
    - `roles`
    - `active_role`
    - `companies`
    - `active_company`

## Scenario 4: Select Role
- Method: `POST`
- URL: `{{base_url}}/api/context/select-role`
- Headers:
  - `Content-Type: application/json`
  - `X-CSRFToken: {{csrf_token}}`
- Body:

```json
{
  "role_code": "companyhr"
}
```

- Expected:
  - `200`
  - `{"active_role": "companyhr"}`

## Scenario 5: Select Company
- Method: `POST`
- URL: `{{base_url}}/api/context/select-company`
- Headers:
  - `Content-Type: application/json`
  - `X-CSRFToken: {{csrf_token}}`
- Body:

```json
{
  "company_id": "5e901a2e-6da5-4225-b0a5-6e8652770ef2"
}
```

- Expected:
  - `200`
  - `{"active_company": "5e901a2e-6da5-4225-b0a5-6e8652770ef2"}`

## Scenario 6: Logout
- Method: `POST`
- URL: `{{base_url}}/api/auth/logout`
- Headers:
  - `Content-Type: application/json`
  - `X-CSRFToken: {{csrf_token}}`
- Body:

```json
{}
```

- Expected:
  - `200`
  - `{"success": true}`

## Scenario 7: Session Re-check
- Method: `GET`
- URL: `{{base_url}}/api/auth/me`
- Expected:
  - `200`
  - `{"authenticated": false}`

## Negative Checks

### Not Logged In
- `GET {{base_url}}/api/context` -> `401`
- `POST {{base_url}}/api/context/select-role` -> `401`
- `POST {{base_url}}/api/context/select-company` -> `401`

### Invalid Selection (while logged in)
- `POST {{base_url}}/api/context/select-role`

```json
{
  "role_code": "not_assigned"
}
```

- Expected: `403`, `{"error":"Forbidden role selection."}`

- `POST {{base_url}}/api/context/select-company`

```json
{
  "company_id": "00000000-0000-0000-0000-000000000000"
}
```

- Expected: `403`, `{"error":"Forbidden company selection."}`

## CORS Credentials Check
- Request:
  - `GET {{base_url}}/api/auth/me`
  - Header `Origin: http://localhost:3000`
- Expected response headers:
  - `Access-Control-Allow-Origin: http://localhost:3000`
  - `Access-Control-Allow-Credentials: true`
