# Ferme Project Overview

## Project Structure
This is a full-stack application with separate frontend and backend components.

### Backend (Django)
- **Framework**: Django + Django REST Framework
- **Location**: `/ferme-backend/`
- **Key Components**:
  - Menu app with models, views, and serializers
  - Media handling for menu images
  - SQLite database
  - CORS headers enabled
  - Jazzmin admin interface

### Frontend (React + TypeScript)
- **Framework**: React with TypeScript + Vite
- **Location**: `/ferme-frontend/`
- **Key Components**:
  - Menu-related components (Menu, MenuCard)
  - Cart functionality with Context API
  - TypeScript configuration
  - API integration layer

## Key Features
1. Menu Management System
   - Backend models for menu items
   - Image handling capabilities
   - REST API endpoints

2. Shopping Cart
   - Context-based state management
   - Cart component implementation

3. UI Components
   - Header component
   - Menu display
   - Cart interface

## Technical Stack
### Backend
- Django 5.2.6
- Django REST Framework
- Django CORS Headers
- Pillow for image handling
- SQLite database

### Frontend
- React with TypeScript
- Vite build tool
- ESLint for code quality
- PostCSS for styling
- Context API for state management

## Development Notes
1. **API Integration**
   - API calls are centralized in `/ferme-frontend/src/api/`
   - Menu-related API endpoints defined in `menu.ts`

2. **Asset Management**
   - Menu images stored in `/ferme-backend/media/menu_images/`
   - Frontend assets in `/ferme-frontend/src/assets/`

3. **Database**
   - Using SQLite (db.sqlite3)
   - Migrations tracked in menu/migrations/

## Future Development Considerations
1. Ensure proper CORS configuration between frontend and backend
2. Monitor media file handling and storage
3. Consider implementing user authentication
4. Plan for cart persistence
5. Consider implementing order processing system

## Environment Setup
- Python virtual environment in `/ferme-backend/venv/`
- Node.js dependencies managed via package.json
- TypeScript configurations in place
