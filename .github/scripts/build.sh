#!/bin/bash
set -xe

  docker-compose -f docker-compose.prod.yml down

  git pull origin main

  docker-compose -f docker-compose.prod.yml up -d --build

  docker image prune -a -f --filter "until=24h"