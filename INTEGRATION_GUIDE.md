# Test Repository Integration Guide

This guide explains how to integrate the test repository to meet Immerse team's requirements:
- ✅ Tests run daily
- ✅ Automatic trigger on new test push
- ✅ Slack notification on test completion

---

## Prerequisites

- GitHub repository access
- Slack workspace admin access
- Google Gemini API key (for AI-based test features)

---

## Step 1: Repository Setup

### 1.1 Fork or Clone the Repository

```bash
# Option A: Fork the original repository
# Go to https://github.com/donobu-inc/immerse-tests
# Click "Fork" button

# Option B: Clone to your organization
git clone https://github.com/donobu-inc/immerse-tests.git
cd immerse-tests
git remote set-url origin https://github.com/YOUR_ORG/immerse-tests.git
git push -u origin main
```

---

## Step 2: Configure Workflow Triggers

### 2.1 Add Push Trigger for Automatic Test Execution

Edit `.github/workflows/run-tests.yml` and `.github/workflows/run-smoke-tests.yml`:

**Add this to the `on:` section:**

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'tests/**/*.spec.ts'  # Only trigger when test files change
  pull_request:
  schedule:
    - cron: "15 13 * * *"  # Runs daily at 13:15 UTC
  workflow_dispatch:
```

**What this does:**
- `push`: Triggers when test files are pushed to main branch
- `pull_request`: Triggers when PR is created
- `schedule`: Runs daily at specified time
- `workflow_dispatch`: Allows manual execution

---

## Step 3: Set Up Slack Integration

### 3.1 Create Slack Incoming Webhook

1. Go to https://api.slack.com/apps
2. Click **"Create New App"** → **"From scratch"**
3. Enter:
   - **App Name**: `GitHub Test Notifier` (or your preferred name)
   - **Workspace**: Select your Slack workspace
4. Click **"Create App"**

5. In the left sidebar, click **"Incoming Webhooks"**
6. Toggle **"Activate Incoming Webhooks"** to **ON**
7. Scroll down and click **"Add New Webhook to Workspace"**
8. Select the channel where you want to receive notifications (e.g., `#qa-alerts`)
9. Click **"Allow"**

10. **Copy the Webhook URL**
    - Format: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX`

### 3.2 Add Webhook URL to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Enter:
   - **Name**: `SLACK_WEBHOOK_URL`
   - **Secret**: Paste the Webhook URL from Step 3.1
5. Click **"Add secret"**

---

## Step 4: Configure Required Secrets and Variables

### 4.1 Add API Keys (Secrets)

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key for AI features | `AIza...` |
| `PASSWORD` | Test account password | `your-password` |
| `SLACK_WEBHOOK_URL` | Slack webhook URL (from Step 3) | `https://hooks.slack.com/...` |

### 4.2 Add Variables

Go to **Settings** → **Secrets and variables** → **Actions** → **Variables** → **New repository variable**

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `EMAIL` | `sample.hradmin.readwrite.6@immerse.online` | Test account email |

---

## Step 5: Verify Configuration

### 5.1 Test Manual Execution

```bash
# Using GitHub CLI
gh workflow run "Run Playwright Tests" --repo YOUR_ORG/immerse-tests

# Or via GitHub UI
# Go to Actions tab → Select "Run Playwright Tests" → Click "Run workflow"
```

### 5.2 Verify Slack Notification

After the test completes (~10-15 minutes), check your Slack channel for:

```
🎭 Playwright Test Results

Repository: YOUR_ORG/immerse-tests
Branch: main
Status: ✅ All tests passed

Tests: 22 passed, 0 failed
Duration: 10m 32s

📊 View full report: [GitHub Actions Link]
```

### 5.3 Test Push Trigger

```bash
# Make a small change to any test file
echo "// test comment" >> tests/smoke-tests/logged-in/test-dashboard-page.spec.ts
git add tests/smoke-tests/logged-in/test-dashboard-page.spec.ts
git commit -m "test: Verify push trigger"
git push

# Tests should automatically run and Slack notification should arrive
```

---

## Step 6: Workflow Behavior Summary

### Automatic Execution Triggers

| Trigger | When | Frequency |
|---------|------|-----------|
| **Daily Schedule** | Every day at 13:15 UTC (22:15 KST) | Full test suite |
| **Daily Schedule** | Every day at 13:35 UTC (22:35 KST) | Smoke tests |
| **Push to main** | When `*.spec.ts` files change | Both workflows |
| **Pull Request** | When PR is created/updated | Both workflows |
| **Manual** | Via GitHub Actions UI | On demand |

### Expected Behavior

1. **Test Execution**: All tests run in parallel workers
2. **Results Collection**: Test reports generated
3. **Slack Notification**: Results sent to configured channel
4. **Artifacts**: Test results and HTML reports uploaded to GitHub
5. **Status**: Workflow status reflects actual test results

---

## Troubleshooting

### Slack Notifications Not Received

**Check:**
1. `SLACK_WEBHOOK_URL` secret is set correctly
2. Webhook URL is valid and not expired
3. Slack app has permission to post to the channel
4. Check GitHub Actions logs for Slack posting errors

**Verify in workflow logs:**
```
Post to Slack
✓ Slack notification sent successfully
```

### Tests Not Triggering on Push

**Check:**
1. Changes are in `tests/**/*.spec.ts` files
2. Push is to `main` branch
3. Workflow files have correct `paths` filter

### API Key Issues

**Symptoms:**
- Tests fail with authentication errors
- AI assertions fail

**Solution:**
1. Verify `GOOGLE_GEMINI_API_KEY` is set
2. Check API key is valid at https://aistudio.google.com/apikey
3. Ensure API quota is not exceeded

---

## Cost Considerations

### Gemini API Usage

- **Estimated monthly cost**: ~$0.50
- **API calls per day**: ~200 (2 runs × ~100 AI assertions)
- **Free tier**: 1,500 requests/month
- **Paid tier**: Very low cost (~$0.075 per 1M tokens)

### GitHub Actions

- **Public repositories**: Free unlimited minutes
- **Private repositories**: 2,000 free minutes/month
- **Estimated usage**: ~30-40 minutes per full test run

---

## Summary Checklist

- [ ] Repository forked/cloned to your organization
- [ ] Workflow files updated with `push` trigger
- [ ] Slack Incoming Webhook created
- [ ] `SLACK_WEBHOOK_URL` secret added to GitHub
- [ ] `GOOGLE_GEMINI_API_KEY` secret added
- [ ] `PASSWORD` secret added
- [ ] `EMAIL` variable added
- [ ] Manual test run successful
- [ ] Slack notification received
- [ ] Push trigger verified

---

## Next Steps

Once integration is complete:

1. **Customize schedule**: Adjust cron times if needed
2. **Add more tests**: New tests will automatically run
3. **Monitor results**: Check Slack for daily updates
4. **Review reports**: Access detailed HTML reports in GitHub Actions artifacts

---

## Support

For issues or questions:
- Check GitHub Actions logs for detailed error messages
- Review Playwright documentation: https://playwright.dev
- Donobu documentation: https://www.donobu.com
- Contact repository maintainers

---

**Integration completed!** Your test repository now meets all Immerse requirements. 🎉
