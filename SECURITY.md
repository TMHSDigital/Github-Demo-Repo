# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to security@example.com. All security vulnerabilities will be promptly addressed.

Please do not disclose security vulnerabilities publicly until they have been handled by the team.

## Security Practices

This repository follows these security best practices:

### Credential Management

- No API keys, passwords, or tokens should be committed to this repository
- All sensitive values should be stored as environment variables
- For GitHub Actions, use GitHub Secrets for sensitive values

### Code Security

- Dependencies are regularly updated using Dependabot
- Security scanning is performed on all pull requests
- Branch protection rules prevent direct commits to main

### Data Protection

- No personal or sensitive data should be used in tests or examples
- Sample data should be anonymized and fictional
- Logs and error messages should not contain sensitive information

## Security Checklist for Contributors

Before submitting a pull request, please ensure:

- No credentials, API keys, or tokens are included in the code
- No `.env` files are committed (use `.env.example` with placeholder values)
- No personal or sensitive data is included in the codebase
- All dependencies are up-to-date and free from known vulnerabilities 