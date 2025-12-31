#!/usr/bin/env bash
set -e

echo "Starting Docker Desktop..."
open -g -a Docker

echo "Waiting for Docker daemon..."
until docker info >/dev/null 2>&1; do
  sleep 1
done

echo "Docker is ready"
docker compose up -d