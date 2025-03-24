# GitHub Demo Repository

[![CI Pipeline](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/deploy-pages.yml)
[![Security Scan](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/security-scan.yml/badge.svg)](https://github.com/yourusername/Github-Demo-Repo/actions/workflows/security-scan.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A comprehensive demonstration of modern GitHub features, best practices, and development workflows. This repository serves as a reference implementation showcasing CI/CD pipelines, automated testing, documentation strategies, and modular code organization techniques.

## 🌟 Features

| Feature | Directory | Technologies |
|---------|-----------|--------------|
| REST API | [`/src/api`](/src/api) | Node.js, Express |
| JWT Authentication | [`/src/api/auth.js`](/src/api/auth.js) | JSON Web Tokens |
| UI Dashboard | [`/examples/ui`](/examples/ui) | React, Chart.js |
| CI/CD Pipeline | [`.github/workflows`](/.github/workflows) | GitHub Actions |
| Documentation | [`/docs`](/docs) | Markdown |
| Docker Setup | [`/`](/Dockerfile) | Docker, docker-compose |
| GitHub Pages | [`examples/ui`](/examples/ui) | GitHub Actions |
| Custom Actions | [`.github/actions`](/.github/actions/code-quality) | GitHub Actions |
| Security Scans | [`.github/workflows`](/.github/workflows/security-scan.yml) | TruffleHog, OWASP |
| GitHub Projects | [`project_documentation`](/project_documentation/github-projects-setup.md) | Project management |

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Docker and Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Github-Demo-Repo.git
cd Github-Demo-Repo

# Set up environment variables (IMPORTANT)
cp src/api/.env.example src/api/.env
# Edit .env file with your secure values

# Set up API (requires Node.js)
cd src/api
npm install
npm start

# Set up UI (in a separate terminal)
cd examples/ui
npm install
npm start
```

### Using Docker

```bash
# Start all services with Docker Compose
docker-compose up -d

# The API will be available at http://localhost:3000
# The UI will be available at http://localhost:5173
```

## 🔐 Authentication

The API implements JWT-based authentication:

```bash
# Login with demo credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# Access protected endpoints with token
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Demo credentials:
- Regular user: username=`demo`, password=`demo123`
- Admin user: username=`admin`, password=`admin123`

The UI also includes authentication with protected routes and a login form.

## 🧪 Testing

```bash
# Run API tests
cd src/api
npm test

# Run UI tests
cd examples/ui
npm test

# Run integration tests
cd tests/integration
npm test
```

## 📚 Documentation

- [Architecture Overview](/docs/ARCHITECTURE.md)
- [Contribution Guidelines](/docs/CONTRIBUTING.md)
- [Workflow Documentation](/docs/WORKFLOWS.md)
- [Security Policy](/SECURITY.md)

## 🔒 Security

This repository demonstrates security best practices including:
- Branch protection rules
- Automated dependency updates via Dependabot
- Secret management via GitHub Secrets
- Regular security scanning using TruffleHog and OWASP Dependency Check

### Security Precautions

To avoid committing sensitive information:
1. **NEVER commit `.env` files** - only commit `.env.example` with placeholder values
2. **Use environment variables** for all secrets and API keys
3. **Install pre-commit hooks** to prevent accidental leaks:
   ```bash
   # Make the pre-commit hook executable
   chmod +x .github/scripts/pre-commit-hook.sh
   
   # Create a symlink to the Git hooks directory
   ln -sf ../../.github/scripts/pre-commit-hook.sh .git/hooks/pre-commit
   ```
4. **Review security scans** before merging pull requests
5. **Report security issues** by following our [Security Policy](/SECURITY.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](/docs/CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [GitHub Actions](https://github.com/features/actions)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Docker](https://www.docker.com/)


    
