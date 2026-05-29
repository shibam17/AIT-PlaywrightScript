# AIT Playwright Lab - Sample Tests

Sample Playwright test suite for the **AI Test Automation (AIT)** lab. Tests run against the [Rare Rabbit](https://thehouseofrare.com) e-commerce website.

## What's Inside

| File | Purpose |
|------|---------|
| `package.json` | Defines `npm run test` and Playwright dependency |
| `playwright.config.js` | 2-browser config (Chromium + Mobile Chrome) with JUnit reporter |
| `tests/ecommerce.spec.js` | 10 tests across 4 suites |

## Test Suites

| Suite | Tests | Expected Outcome |
|-------|-------|-----------------|
| Homepage | 3 | Pass |
| Product Catalog | 2 | Pass |
| Navigation | 2 | Pass |
| Performance & Quality | 3 | 1 timeout, 1 soft-fail, 1 skipped |

Total: 10 tests x 2 browsers = **20 executions** in AIT.

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `BASE_URL` | Yes | Target website URL | `https://thehouseofrare.com` |
| `TEST_TIMEOUT` | No | Max time per test in ms | `60000` |

## Running Locally

```bash
npm install
npx playwright install
BASE_URL=https://thehouseofrare.com npx playwright test
```

## AIT Configuration

The JUnit reporter is pre-configured in `playwright.config.js`:

```js
reporter: [
  ['list'],
  ['junit', { outputFile: 'test-results/results.xml' }],
],
```

AIT parses `test-results/results.xml` to display per-test results. Without this reporter, you only get a single pass/fail for the entire run.

## Using with AIT

1. Create a new Test Suite (Playwright Build) in AIT
2. Point the Git configuration to this repo
3. Set `BASE_URL` as an environment variable
4. Run the build
