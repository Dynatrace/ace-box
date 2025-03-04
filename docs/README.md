# ACE-Box documentation

Built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Automatically managed by `.github/workflows/ace-box-doc.yaml`. Using GitHub pages, more info [here](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

## Troubleshooting

A common error, a cache issue:

Module not found: Error: Can't resolve '@site/docs/tutorial-basics/deploy-your-site.md' in '/Users/ignacio.goldman/Library/CloudStorage/OneDrive-Dynatrace/Desktop/Dynatrace/03_ace-box/ace-box/docs/.docusaurus'

Delete the .docusaurus folder adn run yarn start again