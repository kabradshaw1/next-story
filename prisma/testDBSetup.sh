#!/blin/bash
# Purpose: Create the test database so that my prisma tests can run

# Variables
DB_NAME="test_story_app"
DB_USER="user"
DB_PASSWORD="password"
DB_HOST="postgresql"
DB_PORT="5432"
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# Create the database
echo "Creating database $DB_NAME..."
psql -h $DB_HOST -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Set the environment variable for Prisma
export DATABASE_URL=$DATABASE_URL

# Run Prisma migrate
echo "Running Prisma migrate..."
npx prisma migrate deploy

echo "Database setup complete."