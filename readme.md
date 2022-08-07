# Auth Api Ser

This is an authentication api service that can serve as a 3rd party authentication service for other services.

## Documentation

Endpoint docs can be found at /api/docs or [Documentation](https://documenter.getpostman.com/view/15040280/VUjMnkSx)

## Features

1. Login  - POST /api/v1/auth/login
2. Signup - POST /api/v1/auth/signup
3. Logout - GET /api/v1/auth/logout
4. Verify Account - GET /api/v1/auth/verify_account/:token
5. Forgot Password - POST /api/v1/auth/password_reset
6. Password Reset - POST /api/v1/auth/password_reset/:token
7. List Users - GET /api/v1/auth/users (requires token)
8. Get User - GET /api/v1/auth/user/:id (requires token)
9. Update User - PUT /api/v1/auth/user/:id (requires token)
10. Delete User - DELETE /api/v1/auth/user/:id (requires token)
11. Change User Role - PUT /api/v1/auth/user/:id/role (requires token)