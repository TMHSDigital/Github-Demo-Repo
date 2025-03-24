#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "Running security pre-commit checks..."

# Check for potential AWS keys
if git diff --cached | grep -E 'AKIA[A-Z0-9]{16}'; then
  echo -e "${RED}Error: Potential AWS access key IDs found in staged changes.${NC}"
  exit 1
fi

# Check for potential JWT/API tokens/keys
if git diff --cached | grep -E '(eyJ[a-zA-Z0-9]{10,}\.eyJ[a-zA-Z0-9]{10,}\.[a-zA-Z0-9_-]{10,})'; then
  echo -e "${RED}Error: Potential JWT tokens found in staged changes.${NC}"
  exit 1
fi

# Check for private keys
if git diff --cached | grep -E '-----BEGIN .{1,20} PRIVATE KEY-----'; then
  echo -e "${RED}Error: Private key found in staged changes.${NC}"
  exit 1
fi

# Check for .env files
if git diff --cached --name-only | grep -E '\.env$' | grep -v '\.env\.example$'; then
  echo -e "${RED}Error: .env file is staged for commit. Only .env.example files should be committed.${NC}"
  exit 1
fi

# Check for potential passwords
if git diff --cached | grep -i -E '(password|passwd|pwd|secret)(\s)*=(\s)*['\''"][^\$][^'\''"]+(('\'')|("\s))'; then
  echo -e "${YELLOW}Warning: Potential hardcoded password or secret found in staged changes.${NC}"
  echo -e "${YELLOW}Please verify that this is not a real credential before continuing.${NC}"
  read -p "Continue with commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo -e "${GREEN}No obvious security issues found in staged changes.${NC}"
echo "Remember: This check is not foolproof. Always manually review your code for sensitive information."
exit 0 