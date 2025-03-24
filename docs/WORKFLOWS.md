# GitHub Workflows Documentation

This document describes the GitHub Actions workflows implemented in this repository and how they support our development process.

## Available Workflows

### CI Pipeline (`ci.yml`)

Triggered on push and pull requests to the main branch. This workflow:

1. Runs linting and code style checks
2. Executes unit and integration tests
3. Builds artifacts for deployment
4. Reports test coverage

```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

### Dependency Management (`dependabot.yml`)

Automatically creates pull requests for outdated dependencies:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/src/api"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/examples/ui"
    schedule:
      interval: "weekly"
```

## Workflow Configuration

### Environment Variables

Workflows use GitHub Secrets for sensitive information:

- `API_KEY`: Authentication token for external services
- `DEPLOY_TOKEN`: Deployment credentials

### Artifact Storage

Build artifacts are stored for 7 days and can be accessed from the Actions tab in GitHub.

## Custom GitHub Actions

This repository demonstrates both using existing actions and creating custom actions:

### Example: Code Coverage Report

```yaml
- name: Generate coverage report
  uses: ./.github/actions/coverage-report
  with:
    threshold: 80
```

## Deployment Workflow

The deployment workflow demonstrates a complete CI/CD pipeline:

1. Build and test on feature branches
2. Automatic deployment to staging on merge to develop
3. Manual approval for production deployments
4. Production deployment with rollback capability 