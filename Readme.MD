# Three.js React Demo

This repository contains a small React project that renders a spinning cube using [Three.js](https://threejs.org/). The site is built with [Vite](https://vitejs.dev/) and can be deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

The project is located in the `website` directory. After running the dev command, open `http://localhost:5173` to view the site.

## Building

```bash
npm run build
```

The built files will appear in `website/dist`.

## GitHub Actions

- **CI** – `.github/workflows/ci.yml` runs `npm ci` and `npm run build` on every push and pull request.
- **Deploy** – `.github/workflows/deploy.yml` builds the project and publishes the content of `website/dist` to GitHub Pages when changes are pushed to the `main` branch.

To enable deployment, configure GitHub Pages for the repository and grant the workflow permission to deploy.
