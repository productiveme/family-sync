# Modern PWA Template

A modern Progressive Web App template built with Preact, GraphQL, and Vite. This template includes real-time subscriptions, offline support, and a modern development setup.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- 🔄 **PWA Support** - Full Progressive Web App capabilities with install prompt
- ⚛️ **Preact** - Lightweight React alternative
- 📱 **Responsive Layout** - Mobile-first design with Tailwind CSS
- 🚀 **GraphQL** - Full GraphQL setup with queries, mutations, and subscriptions
- 🔄 **State Management** - Zustand for simple and effective state management
- 🎯 **Routing** - Client-side routing with Wouter
- 💅 **Styling** - Tailwind CSS for utility-first styling
- 🔌 **Offline Support** - Service worker and offline functionality
- 🏗️ **Clean Architecture** - Functional approach with clear separation of concerns

## Project Structure

```
├── client/
│   ├── config/           # App configuration
│   ├── domain/          # Business logic and state management
│   ├── infrastructure/  # Technical implementations
│   └── presentation/    # UI components and pages
├── server/
│   ├── config/         # Server configuration
│   ├── services/       # Core business logic
│   ├── controllers/    # Request handlers
│   ├── infrastructure/ # Server setup and technical implementations
│   └── schema.js       # GraphQL schema
└── package.json
```

## Quick Start

1. Install dependencies:
```bash
npm install
```
2. Set up basic configuration
```bash
node setup
```
3. Start development server
```bash
npm run dev
```

This will:
- Install all required dependencies
- Start both the client and server in development mode
- Open the app in your default browser

## Available Scripts

- `npm run dev` - Start development server (both client and server)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Environment Variables

Create a `.env` file in the root:

```env
VITE_APP_NAME="Modern PWA"
VITE_PORT=3001
VITE_PORT_GQL=3002
```

## Architecture

The project follows a functional clean architecture approach:

- **No classes** - Uses plain functions and factory functions
- **Dependency Injection** - Via factory functions and closures
- **Pure Functions** - Where possible for predictable behavior
- **Immutability** - Returns frozen objects to prevent mutations
- **Clear Separation** - Distinct layers for different concerns
- **Testability** - Easy to test with injectable dependencies

## PWA Features

- Installable as standalone app
- Works offline
- Smart install prompt with persistence
- Push notification support
- Automatic updates

## Styling

Uses Tailwind CSS with:
- Custom color scheme
- Dark mode support
- Responsive design
- Component-based styles

## License

MIT
