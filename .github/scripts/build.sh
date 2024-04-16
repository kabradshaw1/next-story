#!/bin/bash
set -xe

  cd next-story
  
  docker-compose -f docker-compose.prod.yml down

  docker image prune -a   

  git pull origin main

  docker-compose -f docker-compose.prod.yml up -d --build

  