# GitHub Actions Workflow Guide

## Quick Start

**Automatic runs (push/PR/schedule):** Use `test` environment + Chromium browser  
**Manual runs (workflow dispatch):** Select environment and browser from dropdowns

## Setup (One-time)

1. **Create environments in GitHub:**

   - Settings → Environments → New environment
   - Create: `test`, `staging`, `production` (or your environments)

2. **Add secrets to each environment:**
   - `BASE_URL`
   - `EXISTING_USER_EMAIL`
   - `EXISTING_USER_PASSWORD`
   - `NEW_USER_EMAIL`
   - `NEW_USER_PASSWORD`

## How It Works

### Automatic Runs (Push/PR/Scheduled)

```
Push/PR to main → test environment → Chromium → Creates .env.test
```

### Manual Runs (Workflow Dispatch)

```
Click "Run workflow" → Select environment → Select browser → Runs tests
```

### Browser Mapping

| User Selection | Playwright Project       |
| -------------- | ------------------------ |
| `chrome`       | chromium                 |
| `firefox`      | firefox                  |
| `safari`       | webkit                   |
| `all`          | all browsers in parallel |

## Running Tests Manually

1. Go to **Actions** tab
2. Select **Playwright Tests** workflow
3. Click **Run workflow**
4. Select:
   - **Browser:** chrome, firefox, safari, or all
   - **Environment:** test, staging, production, etc.
5. Click **Run workflow**

## Scenarios

| Trigger          | Environment | Browser  | Duration |
| ---------------- | ----------- | -------- | -------- |
| Push to main     | test        | chromium | ~13s     |
| Manual (chrome)  | test        | chromium | ~13s     |
| Manual (all)     | test        | all      | ~40s     |
| Manual + staging | staging     | selected | ~13s     |

## Workflow Features

- ✅ Dynamic environment selection
- ✅ Dynamic browser selection
- ✅ Automatic test report upload to GitHub Pages
- ✅ Configurable for multiple environments
- ✅ Environment-scoped secrets

## File Location

`.github/workflows/playwright.yml`

## Environment Variable Setup

The workflow:

1. Reads your manual selections (or uses defaults)
2. Runs `./scripts/setup-env.sh` to create `.env.<environment>` file
3. Playwright uses the `.env` file for test configuration
4. Runs tests on selected browser

## Troubleshooting

| Issue                             | Solution                                              |
| --------------------------------- | ----------------------------------------------------- |
| No environments in dropdown       | Create them in Settings → Environments                |
| Wrong environment used            | Check dropdown selection; auto runs always use `test` |
| Tests failing                     | Verify secrets are set in the environment             |
| "context access might be invalid" | Create environment and add all required secrets       |

## Additional Docs

- `scripts/README.md` - Environment setup script details
- `GITHUB_SETUP.md` - Detailed environment secrets setup
- `.github/workflows/playwright.yml` - Workflow source code
