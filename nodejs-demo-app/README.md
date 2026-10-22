# nodejs-demo-app — CI/CD with GitHub Actions + Docker Hub

A small Node.js web app with a fully automated CI/CD pipeline.
On every push to `main`, GitHub Actions **tests → builds → pushes** a Docker image to Docker Hub.

## Tools used
GitHub, GitHub Actions, Node.js, Docker, Docker Hub

## Project structure
```
.
├── .github/workflows/main.yml   # CI/CD pipeline
├── app.js                       # HTTP server (built-in http module, no dependencies)
├── server.js                    # Starts the server
├── app.test.js                  # Tests (node:test)
├── Dockerfile                   # Container image definition
├── .dockerignore
├── package.json
└── package-lock.json
```

## Pipeline (`.github/workflows/main.yml`)
Trigger: `push` to `main`.

| Job | What it does |
|-----|--------------|
| `test` | Checkout → set up Node 20 → `npm ci` → `npm test` |
| `build-and-push` | Runs only if `test` passes (`needs: test`) → Buildx → Docker Hub login → build & push image tagged `latest` and the commit SHA |

## Secrets required
Add under **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (Account Settings → Security → New Access Token, Read & Write) |

Secrets are never hard-coded; they are injected at runtime and masked in logs.

## Run locally
```bash
npm test
npm start                         # http://localhost:3000
docker build -t nodejs-demo-app .
docker run -p 3000:3000 nodejs-demo-app
```

## Run the published image
```bash
docker run -p 3000:3000 <your-dockerhub-username>/nodejs-demo-app:latest
```

## Endpoints
- `GET /` → greeting
- `GET /health` → `{"status":"ok"}`

## Screenshots
Add screenshots of the successful workflow run and the Docker Hub repo in a `screenshots/` folder.
