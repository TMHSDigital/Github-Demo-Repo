# Sample GitHub Pull Request: Implement JWT Authentication

This document represents how a GitHub pull request would look. In a real repository, you would create this as an actual GitHub pull request through the web interface.

## Pull Request Title: Implement JWT Authentication

**Linked Issues:** Fixes #42
**Reviewers:** @api-team-lead @security-team
**Labels:** feature, security, api

## Description

This PR implements JWT authentication for the API, allowing users to log in and access protected routes with token-based authentication.

### Changes Made

- Added JWT authentication middleware
- Created login endpoint for generating tokens
- Implemented token verification and validation
- Added protected routes that require authentication
- Added admin-only routes with role verification
- Updated tests to cover authentication scenarios
- Updated documentation with authentication details

### How to Test

1. Clone this branch
2. Run `npm install` in the `src/api` directory
3. Start the API with `npm start`
4. Use these requests to test:

```bash
# Login (replace with your actual endpoint)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# Access protected route with token
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Access admin route (will fail with regular user token)
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Screenshots

(In a real PR, you would attach screenshots here)

## Checklist

- [x] Code follows the project's coding standards
- [x] New code includes comments/documentation
- [x] All tests are passing
- [x] Added tests for the new functionality
- [x] Updated documentation
- [x] No new security vulnerabilities introduced
- [x] No sensitive information is exposed

## Additional Notes

The JWT secret is stored as an environment variable and is not hardcoded. In development, it falls back to a default value, but in production, it must be set with a secure random value. 