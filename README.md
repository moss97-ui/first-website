# Small Steps: your first website

This is a complete website with no dependencies, accounts, API keys, database, or build step.

## Run it on your computer

Download the project, then double-click `dist/index.html`. It opens in your browser. Add a task, mark it complete, then delete it. Tasks reset when you reload or close the page.

## Understand the files

- `dist/index.html`: page structure and content.
- `dist/style.css`: colors, spacing, and responsive layout.
- `dist/app.js`: adding, completing, and deleting tasks.

## Practice the cycle

1. Run the page locally.
2. Edit the heading in `index.html`, save, and refresh the browser.
3. Save the working files in a GitHub repository with a commit.
4. Publish the three files together on static hosting.
5. Visit the hosted URL and check the task interactions.
6. Make another change, commit it, and publish the update.

The hosted Sites example uses `dist` as its public directory. `.openai/hosting.json` configures that hosting service. It is not needed to open the website locally or to use another static host.

For a GitHub Pages exercise, place the three files from `dist` at the root of a separate GitHub repository. We can walk through the hosting settings together.

CI/CD is not required to run this example. Later, a pipeline can check JavaScript syntax and automate publication. A SaaS adds other concerns such as a backend, database, authentication, secrets, and backups.
