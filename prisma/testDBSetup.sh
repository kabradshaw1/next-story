#!/bin/bash
# Purpose: Create the test database so that my prisma tests can run.  
# Run this script with bash -x testDBSetup.sh

# Variables
DB_NAME="test_story_app"
DB_USER="user"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="6000"
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# Create the database
echo "Creating database $DB_NAME..."
psql -h $DB_HOST -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Run Prisma migrate
echo "Running Prisma migrate..."
DATABASE_URL=$DATABASE_URL npx prisma migrate dev --name "test_setup"

echo "Database setup complete."