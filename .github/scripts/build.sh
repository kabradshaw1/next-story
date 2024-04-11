#!/bin/bash
set -xe

  cd ../..

  docker-compose down

  git pull origin main

  docker-compose -f docker-compose.prod.yml up -d --build