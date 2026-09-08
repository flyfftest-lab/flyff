# Contributing

Contributions are welcome! This is a fan project reimplementing Flyff v15 for the web.

## Prerequisites

- **Node.js** 20+ ([download](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm`)
- **Docker** (for PostgreSQL — [download](https://www.docker.com/))
- **Git**

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd web-mmo
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Edit .env with your local Flyff v15 asset paths (see docs/ASSET_SETUP.md)
```

### 3. Start PostgreSQL

```bash
docker-compose up -d postgres
```

### 4. Create a test account

```bash
npx tsx scripts/create-account.ts admin admin admin@test.com
```

### 5. Run the servers and client

```bash
# Terminal 1 — Login server
pnpm dev:login

# Terminal 2 — Game server
pnpm dev:game
```

### 6. Build and run the WASM client

```bash
# One-time emsdk setup
pnpm client:install

# Configure + build
pnpm client:configure
pnpm client:build

# Serve (port 8080)
pnpm client:run
```

Open http://localhost:8080 in your browser.

## Project Structure

```
web-mmo/
├── packages/
│   ├── shared/          # Binary protocol, types, constants (shared by server + client)
│   ├── server-core/     # DB, data loaders, crypto, networking utilities
│   ├── login-server/    # Auth, character management (WebSocket :28000)
│   ├── game-server/     # World sim, combat, AI, snapshots (WebSocket :2000)
│   └── client/          # C++ Neuz client → WebAssembly (Emscripten)
├── tools/               # Asset conversion utilities (DDS, O3D, RES, etc.)
├── reference/           # Original Flyff v15 source + data files (read-only reference)
├── scripts/             # Utility scripts
├── docs/                # Documentation
└── docker-compose.yml   # PostgreSQL container
```

## Code Style

- **Language**: TypeScript (strict mode)
- **Indentation**: 2 spaces
- **Line endings**: LF
- **Module system**: ESNext (ESM)
- **Naming**: camelCase for variables/functions, PascalCase for classes/types/interfaces

### Key Conventions

- Server packets follow the original CAr binary serialization format (little-endian)
- Snapshot batching uses `[DWORD SNAPSHOT][DWORD playerId][WORD count]{entries}`
- All game logic is server-authoritative
- Entity IDs are sequential integers

## Running Tests

```bash
pnpm test
```

Tests use Node's built-in test runner. Currently the shared protocol package has binary serialization tests.

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes, keeping commits focused
3. Ensure `pnpm build` and `pnpm test` pass
4. Submit a pull request with a clear description of what and why

## Reference Materials

The [`reference/`](reference/) directory contains the original Flyff v15 C++ source code and game data files. Use these to understand original game mechanics, protocol formats, and data structures.

See [`docs/ASSET_SETUP.md`](docs/ASSET_SETUP.md) for information on obtaining and converting original game assets.
