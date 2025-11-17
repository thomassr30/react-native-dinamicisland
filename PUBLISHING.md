# Publishing Guide

This document contains instructions for publishing `react-native-dinamicisland` to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at https://www.npmjs.com/signup
2. **npm CLI**: Make sure you have npm installed and logged in
3. **Git Repository**: Ensure all changes are committed and pushed

## Pre-Publication Checklist

Before publishing, verify:

- [x] Version number updated in `package.json` (currently `1.0.0`)
- [x] CHANGELOG.md updated with release notes
- [x] README.md is complete and accurate
- [x] All tests pass (`npm test`)
- [x] Build completes successfully (`npm run build`)
- [x] Security audit completed (SECURITY.md exists)
- [x] All commits pushed to GitHub
- [ ] Git tag created for version

## Publishing Steps

### 1. Login to npm

```bash
npm login
# Enter your username, password, and email
```

Verify you're logged in:
```bash
npm whoami
# Should display your npm username
```

### 2. Run Final Checks

```bash
# Clean and rebuild
npm run clean
npm run build

# Run tests
npm test

# Verify package contents (dry run)
npm pack --dry-run
```

### 3. Create Git Tag

```bash
# Create annotated tag for v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

### 4. Publish to npm

For the first release:

```bash
# Publish as public package
npm publish --access public
```

For subsequent releases:

```bash
# Standard publish
npm publish
```

### 5. Verify Publication

1. Check npm registry:
   ```bash
   npm view react-native-dinamicisland
   ```

2. Visit package page: https://www.npmjs.com/package/react-native-dinamicisland

3. Test installation in a new project:
   ```bash
   npx create-expo-app test-app
   cd test-app
   npm install react-native-dinamicisland
   ```

## Post-Publication Tasks

### 1. Create GitHub Release

1. Go to https://github.com/thomassr30/react-native-dinamicisland/releases
2. Click "Draft a new release"
3. Select the tag `v1.0.0`
4. Title: "v1.0.0 - Initial Release"
5. Copy content from CHANGELOG.md
6. Publish release

### 2. Update Documentation

- Ensure README badges show correct version
- Update any external documentation
- Share on social media/forums if desired

### 3. Monitor for Issues

- Watch GitHub issues for bug reports
- Check npm download stats
- Respond to community feedback

## Version Management

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features, backwards compatible
- **PATCH** (0.0.X): Bug fixes, backwards compatible

### For Future Releases

1. Update version in `package.json`:
   ```bash
   npm version patch   # for 1.0.1
   npm version minor   # for 1.1.0
   npm version major   # for 2.0.0
   ```

2. Update CHANGELOG.md with new version section

3. Commit changes:
   ```bash
   git add .
   git commit -m "chore: bump version to X.X.X"
   git push
   ```

4. Follow publishing steps above

## Troubleshooting

### "You do not have permission to publish"

Make sure you're logged in to the correct npm account:
```bash
npm whoami
npm login
```

### "Package name already exists"

The package name `react-native-dinamicisland` should be available. If not, you may need to:
1. Choose a different name
2. Request transfer from current owner (if abandoned)

### "ENOENT: no such file or directory"

Make sure you've run the build:
```bash
npm run build
```

### "Version already published"

You cannot republish the same version. Bump the version:
```bash
npm version patch
```

## npm Package Settings

After publishing, configure these settings on npmjs.com:

1. **Repository**: Should link to GitHub automatically
2. **Homepage**: https://github.com/thomassr30/react-native-dinamicisland
3. **Keywords**: Already configured in package.json
4. **Collaborators**: Add team members if needed

## Security

- Never commit `.npmrc` with auth tokens
- Use 2FA on your npm account
- Review SECURITY.md for security policy
- Monitor for vulnerabilities: `npm audit`

## Support

For questions or issues with publishing:
- npm support: https://www.npmjs.com/support
- GitHub Issues: https://github.com/thomassr30/react-native-dinamicisland/issues

---

**Ready to publish?** Follow the steps above carefully and you'll have your package live on npm in minutes!

Good luck! 🚀
