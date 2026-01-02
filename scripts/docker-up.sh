#!/usr/bin/env bash
set -e

OS="$(uname -s)"

start_docker() {
  case "$OS" in
    Darwin)
      echo "Starting Docker Desktop (macOS)..."
      open -g -a Docker
      ;;
    Linux)
      echo "Linux detected. Assuming Docker is already running..."
      ;;
    MINGW*|MSYS*|CYGWIN*)
      echo "Starting Docker Desktop (Windows)..."
      powershell.exe -NoProfile -Command "Start-Process 'Docker Desktop'"
      ;;
    *)
      echo "Unsupported OS: $OS"
      exit 1
      ;;
  esac
}

echo "Detected OS: $OS"
start_docker

echo "Waiting for Docker daemon..."
until docker info >/dev/null 2>&1; do
  sleep 1
done

echo "Docker is ready"
docker compose up -d