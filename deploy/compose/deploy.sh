#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/myapp"
cd "$APP_DIR"

echo "Using IMAGE=$IMAGE"

docker compose pull
docker compose up -d --remove-orphans
docker image prune -f
docker compose ps
#!/usr/bin/env bash
set -euo pipefail

cd /opt/app
docker compose pull
docker compose up -d
docker image prune -f
