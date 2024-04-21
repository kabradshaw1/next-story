#!/bin/bash
set -xe

  cd next-story
  
  docker-compose down

  docker image prune -a   

  git pull origin main

  docker-compose -d --build

  