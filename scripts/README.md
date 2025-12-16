# Environment Setup Script

This directory contains scripts for managing environment variables and secrets.

## `setup-env.sh` - Populate .env files from GitHub Actions secrets

### Purpose

Copies environment variables and secrets from GitHub Actions (or local environment) to create appropriate `.env` files for your test automation project.

### Usage

#### Basic usage (defaults to 'test' environment):

```bash
./scripts/setup-env.sh
```

#### Specify environment:

```bash
./scripts/setup-env.sh test
./scripts/setup-env.sh stg
./scripts/setup-env.sh prod
```

### How it works

1. **Reads environment variables** from your current shell/GitHub Actions context
2. **Creates `.env.<environment>` file** in the `resources/` directory
3. **Validates that all required variables are set**
4. **Reports any missing variables** with helpful instructions

### Required environment variables

The script expects these variables to be set in your GitHub Actions secrets or local environment:

- `BASE_URL` - Base URL for the application under test
- `EXISTING_USER_EMAIL` - Email of an existing test user
- `EXISTING_USER_PASSWORD` - Password for the existing test user
- `NEW_USER_EMAIL` - Email for creating new test users
- `NEW_USER_PASSWORD` - Password for new test users

### GitHub Actions integration

#### Step 1: Add secrets to your GitHub repository

Go to **Settings > Secrets and variables > Actions** and add these secrets:

- `BASE_URL`
- `EXISTING_USER_EMAIL`
- `EXISTING_USER_PASSWORD`
- `NEW_USER_EMAIL`
- `NEW_USER_PASSWORD`

#### Step 2: Update your workflow file (`.github/workflows/playwright.yml`)

Add a setup step before running tests:

```yaml
- name: Setup environment variables
  run: ./scripts/setup-env.sh stg
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    EXISTING_USER_EMAIL: ${{ secrets.EXISTING_USER_EMAIL }}
    EXISTING_USER_PASSWORD: ${{ secrets.EXISTING_USER_PASSWORD }}
    NEW_USER_EMAIL: ${{ secrets.NEW_USER_EMAIL }}
    NEW_USER_PASSWORD: ${{ secrets.NEW_USER_PASSWORD }}

- name: Run tests
  run: npm run test
```

### Local development usage

#### Export variables and run the script:

```bash
export BASE_URL="http://localhost:3000"
export EXISTING_USER_EMAIL="test@example.com"
export EXISTING_USER_PASSWORD="password123"
export NEW_USER_EMAIL="newuser@example.com"
export NEW_USER_PASSWORD="newpass123"

./scripts/setup-env.sh test
```

Or create a `.env.local` file and source it:

```bash
source .env.local
./scripts/setup-env.sh test
```

### Output

The script creates files like:

- `resources/.env.stg` - for staging environment
- `resources/.env.test` - for test environment
- `resources/.env.prod` - for production environment (if needed)

### Error handling

If any required variables are missing, the script will:

1. Show which variables are missing
2. Provide instructions on how to set them
3. Exit with code 1 (fail the step in CI/CD)

### Adding new variables

To add new environment variables that your tests need:

1. Edit `scripts/setup-env.sh`
2. Add the variable name to the `ENV_VARS` array:

```bash
ENV_VARS=(
  "BASE_URL"
  "EXISTING_USER_EMAIL"
  "EXISTING_USER_PASSWORD"
  "NEW_USER_EMAIL"
  "NEW_USER_PASSWORD"
  "YOUR_NEW_VAR"  # Add here
)
```

3. Add the corresponding secret in GitHub repository settings
4. Update your workflow file to pass the secret

### Notes

- Generated `.env.*` files should be added to `.gitignore` (they already are by default)
- Never commit actual secret values to your repository
- The script is idempotent — running it multiple times creates fresh files
- Timestamps are included in generated files for audit purposes
