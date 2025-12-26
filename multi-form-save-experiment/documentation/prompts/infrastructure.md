# Infrastructure Prompts

## Prettier

Install Prettier for code formatting.
Create a configuration file `.prettierrc` in the root directory with the following content:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```
Create an `.prettierignore` file to exclude files and directories from formatting:

```
node_modules
dist
```

Create a script in `package.json` to run Prettier.
Create a feature branch for this work.
Commit the changes with a descriptive message.
Create a PR from the feature branch that will be merged into the main branch after review.
