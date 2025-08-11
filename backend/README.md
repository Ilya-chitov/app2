# SEAP Backend

This is the backend API for the Smart Livestock Management Platform (SEAP).

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database credentials.

4. Run database migrations:
   ```bash
   npm run migration:run
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Animals
- `GET /animals` - List all animals
- `POST /animals` - Create a new animal

### Sync (Offline Support)
- `POST /sync/queue` - Queue offline operations
- `GET /sync/changes` - Get recent changes

## Development

- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot reload
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Database

This backend uses TypeORM with PostgreSQL. Migrations are used instead of synchronization to ensure database schema consistency.

- `npm run migration:generate` - Generate a new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert the last migration

## TODO

- Real Firebase authentication integration
- Complete sync conflict resolution
- Expand domain modules (inventory, finance, reports)
- Add comprehensive testing