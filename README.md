# REST API

<p>
  <a href="https://github.com/acfatah/rest-api/commits/main">
  <img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/acfatah/rest-api?display_timestamp=committer&style=flat-square"></a>
</p>

RESTful API boilerplate.

> WORK IN PROGRESS

## Usage

1. Copy the repository,

```bash
npx tiged acfatah/rest-api newproject
```

2. Include standardized VSCode configurations in the repository. By default, the directory
   will be ignored.

```bash
git init && git add -f .vscode
```

3. Initialize `simple-git-hooks`,

```bash
rm -rf .git/hooks && npx simple-git-hooks
```

4. Update and install dependencies.

```bash
npm run update-deps
```

5. Create initial commit

```bash
git branch -M main && git commit -m "Initial commit"
```
