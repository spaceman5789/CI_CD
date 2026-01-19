# CI/CD demo: build -> test -> scan -> deploy (staging)

Minimal Node.js app and GitLab CI pipeline that runs lint/test, builds a Docker
image, scans it with Trivy, pushes to GitLab Container Registry, and deploys to a
staging VM via SSH.

## App

- `GET /health` returns `{ "status": "ok" }`
- other paths return 404

## Local run

```bash
npm run lint
npm test
npm start
```

## CI/CD

Workflow: `.gitlab-ci.yml`

Required GitLab CI/CD variables:

- `STAGING_HOST`
- `STAGING_USER`
- `STAGING_SSH_KEY`

## Staging VM setup

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER

sudo mkdir -p /opt/app
sudo chown $USER /opt/app
```

Copy `deploy/compose/docker-compose.yml` and create `/opt/app/.env` based on
`deploy/compose/.env.example`.

## Status badge

Replace `<GROUP>` and `<PROJECT>`:

```
![CI](https://gitlab.com/<GROUP>/<PROJECT>/-/badges/main/pipeline.svg)
```
