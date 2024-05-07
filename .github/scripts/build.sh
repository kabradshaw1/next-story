#!/bin/bash
set -xe

  cd next-story
  
  docker-compose down

  docker image prune -af   

  git pull origin main

  docker-compose up -d --build

  