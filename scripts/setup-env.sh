#!/bin/bash

# Script to populate .env files from GitHub Actions secrets and environment variables
# Usage: ./scripts/setup-env.sh [environment]
# Example: ./scripts/setup-env.sh stg
# Example: ./scripts/setup-env.sh test
# If no argument provided, defaults to 'test'

set -e

# Default environment
ENV=${1:-test}

# Define the resources directory
RESOURCES_DIR="resources"

# Create resources directory if it doesn't exist
mkdir -p "$RESOURCES_DIR"

# Output file path
ENV_FILE="$RESOURCES_DIR/.env.$ENV"

# Define variables to extract from GitHub Actions secrets/environment
# Add all your secret and environment variable names here
ENV_VARS=(
  "BASE_URL"
  "EXISTING_USER_EMAIL"
  "EXISTING_USER_PASSWORD"
  "NEW_USER_EMAIL"
  "NEW_USER_PASSWORD"
)

# Create or overwrite the .env file
echo "# Auto-generated .env file for environment: $ENV" > "$ENV_FILE"
echo "# Generated on $(date)" >> "$ENV_FILE"
echo "" >> "$ENV_FILE"

# Track if any variables are missing
MISSING_VARS=()

# Extract and write each variable
for var in "${ENV_VARS[@]}"; do
  # Get the value from environment (GitHub Actions passes secrets as env vars)
  if [ -z "${!var}" ]; then
    echo "⚠️  Warning: $var is not set in environment"
    MISSING_VARS+=("$var")
  else
    # Write variable to .env file
    echo "$var=${!var}" >> "$ENV_FILE"
    echo "✓ Set $var"
  fi
done

echo ""
echo "✓ Environment file created: $ENV_FILE"

# Report missing variables
if [ ${#MISSING_VARS[@]} -gt 0 ]; then
  echo ""
  echo "⚠️  Missing the following variables (set them in GitHub Actions secrets):"
  for var in "${MISSING_VARS[@]}"; do
    echo "  - $var"
  done
  echo ""
  echo "Note: If running locally, make sure these are exported in your shell:"
  echo "  export BASE_URL=<value>"
  echo "  export EXISTING_USER_EMAIL=<value>"
  echo "  ..."
  exit 1
fi

echo ""
echo "✓ All required variables are set!"
echo "✓ Ready to run tests with: npx playwright test"
