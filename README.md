# Livestock Management System

A comprehensive livestock management application built with NestJS backend and React frontend, featuring offline-first capabilities, multi-language support, and PWA functionality.

## Overview

This application provides a complete solution for managing livestock operations including animal tracking, inventory management, financial tracking, and reporting. The system is designed to work offline with automatic synchronization when connectivity is restored.

### Key Features

- **Animal Management**: Track livestock with detailed records including breeding, health, and status
- **Offline-First**: Full functionality when offline with automatic sync when online
- **Multi-Language**: Support for English and Ukrainian with easy extensibility
- **PWA Support**: Installable as a mobile/desktop app with service worker capabilities
- **Real-time Sync**: Conflict-free offline queue with server synchronization
- **Modern Tech Stack**: NestJS + TypeORM + React + Redux + TypeScript

## Structure

```
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── config/         # Configuration services
│   │   ├── common/         # Shared entities and utilities
│   │   ├── livestock/      # Animal management module
│   │   ├── sync/           # Offline sync endpoints
│   │   ├── auth/           # Firebase authentication
│   │   ├── users/          # User management (TODO)
│   │   ├── inventory/      # Inventory management (TODO)
│   │   ├── finance/        # Financial tracking (TODO)
│   │   ├── reports/        # Reporting system (TODO)
│   │   ├── notifications/  # Notification system (TODO)
│   │   └── migrations/     # Database migrations
│   └── test/               # Test files
├── frontend/               # React application
│   ├── src/
│   │   ├── assets/         # Styles and static assets
│   │   ├── components/     # Reusable UI components
│   │   ├── modules/        # Feature-specific pages
│   │   ├── services/       # API and utility services
│   │   ├── store/          # Redux store and slices
│   │   └── i18n/           # Internationalization
│   └── public/             # Static assets
├── infra/                  # Docker infrastructure
└── .env.example           # Environment configuration template
```

## Backend Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp ../.env.example .env
# Edit .env with your database and Firebase credentials
```

4. Set up the database:
```bash
# Create the database
createdb livestock_db

# Run migrations
npm run migration:run
```

5. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### API Endpoints

- `GET /animals` - List all animals
- `POST /animals` - Create a new animal
- `GET /animals/:id` - Get animal by ID
- `PATCH /animals/:id` - Update animal
- `DELETE /animals/:id` - Delete animal
- `POST /sync/queue` - Process offline sync operations

## Frontend Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy backend .env or create new one with VITE_ prefixed variables
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### PWA Features

The application includes:
- Service worker for offline functionality
- Web app manifest for installability
- Background sync for data synchronization
- Push notification support (TODO)

## Offline Queue Flow

The application implements a sophisticated offline-first architecture:

1. **Online Operations**: Directly sync with server
2. **Offline Operations**: Queue operations locally
3. **Connectivity Restoration**: Automatically sync queued operations
4. **Conflict Resolution**: Handle conflicts with server state (TODO)

### Sync Process

1. User performs action (create/update/delete)
2. If online: Send to server immediately
3. If offline: Add to local queue with temporary ID
4. When online: Process queue via `/sync/queue` endpoint
5. Server returns ID mapping for temporary IDs
6. Update local state with real IDs

## Development

### Running with Docker

Use the provided Docker Compose setup for easy development:

```bash
cd infra
docker-compose up -d
```

This starts:
- PostgreSQL database (port 5432)
- Backend API (port 3000) 
- Frontend dev server (port 5173)
- Redis cache (port 6379)

### Testing

Backend tests:
```bash
cd backend
npm test
npm run test:e2e
```

Frontend tests:
```bash
cd frontend
npm test
```

### Linting and Formatting

Both backend and frontend include ESLint and Prettier:

```bash
npm run lint
npm run format
```

## Roadmap

### Phase 1 - Core Functionality ✅
- [x] Basic animal management
- [x] Offline queue implementation
- [x] Multi-language support (EN/UA)
- [x] PWA setup with service worker
- [x] Basic sync endpoints

### Phase 2 - Authentication & Users
- [ ] Firebase authentication integration
- [ ] User profiles and preferences
- [ ] Role-based access control
- [ ] Multi-tenant support

### Phase 3 - Advanced Features
- [ ] Inventory management system
- [ ] Financial tracking and reporting
- [ ] Health record management
- [ ] Breeding program tracking
- [ ] Notification system

### Phase 4 - Analytics & Reporting
- [ ] Advanced reporting and analytics
- [ ] Data export (PDF, CSV, Excel)
- [ ] Dashboard customization
- [ ] Mobile app (React Native)

### Phase 5 - Enterprise Features
- [ ] Advanced conflict resolution
- [ ] Audit logging
- [ ] Backup and restore
- [ ] API rate limiting
- [ ] Performance monitoring

## TODO Comments in Code

The codebase includes TODO comments marking areas for future enhancement:

- **Authentication**: Firebase Admin SDK integration
- **Sync**: Advanced conflict resolution
- **Testing**: Comprehensive test coverage
- **Features**: Inventory, finance, reports modules
- **Performance**: Caching and optimization
- **Security**: Rate limiting and validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue on the GitHub repository.
