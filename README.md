# i3s-server
## Overview
A lightweight I3S (Indexed 3D Scene Service) server built with Elysia, designed to serve 3D scene data from SLPK (Scene Layer Package) archives.

## Features
- Load SLPK archives from a specified directory
- Provide scene list endpoint ( /scene-list ) to retrieve available SLPK archives
- Serve I3S scene data through REST API endpoints ( /:id/SceneServer/* )
- Auto-generate scene server metadata with UUID identifiers
## Installation
1. Requires Bun package manager
2. Install dependencies:
   ```
   bun install
   ```
## Usage
1. Place your SLPK files in a directory (default: current working directory)
2. Start development server:
   ```
   bun dev
   ```
3. Access endpoints:
   - GET /scene-list : List available SLPK archives
   - GET /:id/SceneServer/ : Get scene server metadata for specific SLPK
   - GET /:id/SceneServer/* : Access specific scene resources
## API Endpoints
- /scene-list : Returns array of SLPK archive IDs
- /:id/SceneServer/ : Returns scene server metadata including service ID, version info, and layer structure
- /:id/SceneServer/* : Serves scene resources (JSON metadata or binary content) based on path
## Dependencies
- elysia : Fast web framework
- @loaders.gl/i3s : I3S data processing
- @loaders.gl/loader-utils : File loading utilities
- uuid : Generate unique service IDs
## Project Structure
```
src/
├── controllers/
│   └── slpk-controller.ts  # SLPK archive 
management
├── routes/
│   └── scene-server.route.ts  # API route 
definitions
├── utils/
│   └── create-scene-server.ts  # Scene 
server metadata generator
└── index.ts  # Server entry point
```
## License
MIT