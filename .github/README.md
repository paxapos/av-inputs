# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD.

## Workflows

### 1. CI (`ci.yml`)
- **Trigger**: Pull requests and pushes to main branch
- **Purpose**: Run tests, build checks, and bundle size analysis
- **Matrix**: Tests on Node.js 16, 18, and 20

### 2. Release and Publish (`release-and-publish.yml`)
- **Trigger**: Pushes to main branch (with source code changes) or manual dispatch
- **Purpose**: Automatically version, release, and publish to NPM
- **Features**:
  - Smart version bumping based on commit messages (conventional commits)
  - Automatic changelog generation
  - GitHub release creation
  - NPM publishing

### 3. Manual Release (`manual-release.yml`)
- **Trigger**: Manual workflow dispatch only
- **Purpose**: Manual control over releases with custom version bump and notes
- **Use case**: When you need precise control over release timing and content

## Setup Required

### 1. NPM Token
Create an NPM access token and add it as a repository secret:
1. Go to npmjs.com → Account → Access Tokens
2. Create a new "Automation" token
3. Add it to GitHub repository secrets as `NPM_TOKEN`

### 2. Repository Settings
Ensure the following repository settings:
- Actions have read/write permissions to contents
- Allow GitHub Actions to create and approve pull requests (if needed)

## Version Bumping Strategy

### Automatic (release-and-publish.yml)
- **Major**: Commit messages containing "BREAKING CHANGE" or "feat!"
- **Minor**: Commit messages starting with "feat"
- **Patch**: All other changes

### Manual (manual-release.yml)
- Choose version bump type when triggering the workflow
- Add custom release notes

## Usage

### For Automatic Releases
1. Make changes to source code
2. Commit with conventional commit messages:
   - `feat: add new feature` (minor bump)
   - `fix: resolve bug` (patch bump)
   - `feat!: breaking change` (major bump)
3. Push to main branch
4. Workflow automatically handles the rest

### For Manual Releases
1. Go to Actions tab in GitHub
2. Select "Manual Release" workflow
3. Click "Run workflow"
4. Choose version bump type and add notes
5. Trigger the workflow

## Conventional Commit Examples

```bash
# Patch version bump
git commit -m "fix: resolve face detection issue"
git commit -m "docs: update README"
git commit -m "chore: update dependencies"

# Minor version bump
git commit -m "feat: add auto-capture functionality"
git commit -m "feat: improve performance with throttling"

# Major version bump
git commit -m "feat!: change API interface"
git commit -m "feat: add breaking change

BREAKING CHANGE: The face detection API has changed."
```

## Troubleshooting

### Failed NPM Publish
- Check that `NPM_TOKEN` secret is set correctly
- Verify the package name is available or you have publishing rights
- Ensure the version doesn't already exist on NPM

### Failed Version Bump
- Check that the repository has write permissions for Actions
- Verify Git configuration in the workflow

### Build Failures
- Check the build logs in the Actions tab
- Ensure all dependencies are properly listed in package.json
- Verify the build process works locally
