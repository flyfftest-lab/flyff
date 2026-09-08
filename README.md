# Flyff Web MMO

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A web-based reimplementation of Flyff v15 — a clean-room port of the classic MMORPG using TypeScript, Node.js, and the original C++ Neuz client compiled to WebAssembly via Emscripten.

Runs entirely in the browser with WebSocket servers handling authentication, world simulation, and combat.

> **Note:** This is a non-commercial fan project for educational purposes. Flyff v15 is a game developed by Aeonsoft/Gala Lab.

## Project Status

**Early prototype / vertical slice.** The basic gameplay loop works end-to-end (login → move → kill monster → loot → level → save), but most features have significant gaps and all game data is hardcoded.

See [What Works](#what-works), [What's Partial](#whats-partial), and [What's Missing](#whats-missing) below.

## Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (`npm install -g pnpm`)
- **Docker** (for PostgreSQL) — or use SQLite with `DATABASE_URL=sqlite:./data/flyff.db`

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` to point to your local Flyff v15 asset paths (see [docs/ASSET_SETUP.md](docs/ASSET_SETUP.md) for details).

### 3. Start PostgreSQL (skip if using SQLite)

```bash
docker-compose up -d postgres
```

### 4. Create a test account

```bash
npx tsx scripts/create-account.ts admin admin admin@test.com
```

### 5. Start the servers

```bash
# Terminal 1 — Login server (port 28000)
pnpm dev:login

# Terminal 2 — Game server (port 2000)
pnpm dev:game
```

### 6. Build and run the WASM client

```bash
# One-time: set up the emsdk toolchain
pnpm client:install

# Configure + build (generates flyff_web.wasm)
pnpm client:configure
pnpm client:build

# Serve the client (port 8080)
pnpm client:run
```

Open http://localhost:8080 in your browser.

> **Note:** The client currently hardcodes `admin/admin` credentials and always logs in as player ID 1. There is no login screen or character select in the client — those are server-side only.

## What Works

**Rendering & World**
- Data-driven terrain from original .lnd files (49 tiles, Flaris zone)
- World objects (buildings, props) with O3D meshes and collision
- Grass/foliage scattering with alpha-test cutout
- D3D9-to-WebGL2 shader pipeline
- Two-phase collision (OBB broad + triangle mesh narrow) with slide resolution
- Orbit camera with zoom and terrain-aware collision

**Characters**
- Multi-part O3D character models with skeleton and bone animation
- Stand, walk, run, backward-walk, and jump animation states
- 15 outfit sets, 13 head types, 10 hair styles (arrow/H keys to cycle)
- Per-entity gender-aware mesh cache for remote players

**Networking**
- Binary WebSocket protocol matching original CAr serialization
- Login server auth → token → game server join flow
- Snapshot sync with spatial hash visibility (200ms tick)
- Client-side rate limiting on movement and chat packets

**HUD (MFC bridge)**
- Status panel (HP/MP/FP/EXP gauge bars)
- Chat window (scrollable, 3 message types)
- Minimap with player + entity dots
- Character stats sheet (STR/STA/DEX/INT)
- Taskbar with menu button
- Drag-and-drop window management with z-order

**Audio**
- Procedural Web Audio SFX (connect, success, chat, click)
- Footstep sounds synced to walk animation
- WAV playback support
- Mute toggle (0 key)

**Server Gameplay**
- Character creation (3 slots), persistence (pos/level/inventory/save)
- Server-authoritative click-to-move
- Monster spawn with FSM (IDLE/RAGE/RUNAWAY) and 20s respawn
- Melee combat with damage, crit, and EXP/loot on kill
- 6 skills with MP/FP cost, cooldown, and buff application
- HP/MP/FP regeneration (3s tick)
- Gold and item drops (16-item loot table)
- Inventory management (42 slots, stack/move/split)
- Equipment equip/unequip
- Chat broadcast to nearby players

## What's Partial

These features exist but have significant limitations or bugs:

| Feature | Status |
|---------|--------|
| **Auth** | Unsalted MD5. Auto-creates account on unknown username. No registration flow, no rate limiting. |
| **Character select** | Server-side list/create/delete works. Client bypasses it — always joins as player ID 1. |
| **Movement** | Server interpolates, but no destination validation, no speed-hack checks, no server-side collision (Y not simulated). |
| **Monsters** | 3 hardcoded types only. Spawn ~3500 units from player spawn — monsters are unreachable at spawn. `AGGRO_RANGE` declared but unused (monsters only react on hit). No wander/patrol. |
| **Combat** | Placeholder formula (`rand(str, str+5) - def/2`), not Flyff's real formula. No attack-speed gate, no hit rate, no element system. Attack packets unrate-limited. |
| **Skills** | 6 hardcoded (not from data files). No cast time, no AoE, no propSkill loader. Buff stacking is unlimited (re-cast stacks permanently). |
| **Equipment** | Equip/unequip works visually. Grants zero stats — `applyEquipStats()` is a no-op. No level/job requirements. |
| **Drops** | Gold paid twice per kill (direct add + ground drop). Drops never expire, ownership not enforced on pickup. |
| **Inventory** | Stack limit derived from source count (broken). Split uses sequential objId (collision-prone). `addGold()` is empty. |
| **Chat** | Local broadcast only. Type byte read and ignored — no whisper/party/shout/guild channels. |
| **Buffs** | Timer decay and stat revert work. Not persisted across sessions. Not sent as a list to the client. |
| **Persistence** | Saves character row + inventory every 180s. Inventory save is delete-all-then-reinsert (no transaction). Buffs, cooldowns, playtime not saved. |
| **Exp curve** | Custom formula, not Flyff's original table. Stat points accumulate but have no handler to spend them. |
| **Monster models (client)** | 3 O3D models load; all others render as colored diamond markers. |
| **Water** | Blue-tinted ground-shader effect only. No water plane, no reflection, no transparency. |
| **Inventory (client)** | 16-slot grid renders item ID + count. No tooltips, no drag-drop, no use/equip interaction. |
| **Data loaders** | `propItem`, `define`, and `Scanner` loaders exist in `server-core` but are called by nothing. All game data is hardcoded. |

## What's Missing

These systems have **no implementation** (packet opcodes may exist but no handlers):

- **Party** — no Party class, no handlers, no client data
- **Quests** — table exists in DB, no code touches it
- **NPCs / Shops** — no NPC entities, no shop tables, no vendor logic
- **Trade** — 8 opcodes defined, zero handlers
- **Guilds** — client window renders empty, no server support
- **Friends list** — client window renders empty, no packet defined
- **PvP** — players can damage each other accidentally (no target filter), but no flag, arena, or penalty. Dead players cannot revive.
- **Death / Revive** — `Mover.revive()` exists but is never called. Dead = permanently stuck.
- **Teleport / Portals** — single hardcoded world, no portals, no `SETPOS` handler
- **Flying** — `flight_level`/`fxp` columns exist but are unused
- **Job system** — no class advancement, no job change
- **Multiple maps** — only Flaris zone (49 tiles) loaded
- **Combat animations (client)** — DAMAGE packet received and logged; no attack animation or melee handler in WASM
- **Skills (client)** — no skill window, no skill-use UI
- **Skybox** — solid blue background (`glClearColor`), `SkyBox.cpp` compiles but is never called
- **Music / BGM** — no background music
- **Login screen (client)** — hardcoded credentials, no input fields
- **Responsive resolution** — fixed 1280×720

## Known Security Issues

These are development-stage issues that must be fixed before any public exposure:

1. **IDOR** — character join and delete accept any `charId` without verifying account ownership
2. **Unsalted MD5** passwords with auto-account-creation on unknown username
3. **Non-constant-time** token comparison in auth
4. **Non-transactional inventory save** — crash mid-save loses all items
5. **Unbounded movement** — `MAX_MOVE_RANGE` declared but never enforced
6. **No input validation** on character names, slots, or stats

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Server | Node.js, TypeScript, WebSocket (`ws`) |
| Client | C++ Neuz -> WebAssembly (Emscripten, GLES2/WebGL) |
| Database | PostgreSQL 16 (Docker) or SQLite |
| Protocol | Binary WebSocket (original CAr format) |
| Package Manager | pnpm workspaces |
| Toolchain | CMake + Ninja + emsdk |

## Architecture

```
packages/
├── shared/          # Binary protocol, types, constants (server + client)
├── server-core/     # DB, data loaders, crypto, net utilities
├── login-server/    # Auth, character management (WebSocket :28000)
├── game-server/     # World sim, combat, AI, snapshots (WebSocket :2000)
└── client/          # C++ Neuz client -> WebAssembly (Emscripten)

tools/               # Asset conversion utilities (DDS, O3D, RES, terrain)
reference/           # Original Flyff v15 source + data files (reference)
```

### Data Flow

```
Browser (WASM) --WS--> Login Server --> PostgreSQL
       |
       +--WS--> Game Server
                   |
                   +-- World simulation (fixed-tick loop)
                   +-- Combat / AI / Inventory
                   +-- Snapshot broadcast (spatial hash visibility)
```

## Protocol

WebSocket binary protocol matching the original CAr serialization format:

- Little-endian byte order
- String format: `int32` length prefix + UTF-8 bytes
- Packet structure: `[DWORD opcode][payload]`
- Snapshot batching: `[DWORD SNAPSHOT][DWORD playerId][WORD count]{entries}`

## Testing

Two test files:

- `packages/shared/src/protocol/binary.test.ts` — binary reader/writer round-trip
- `packages/game-server/src/skill/SkillDefinition.test.ts` — skill table lookup

No coverage for: auth, combat, inventory, persistence, visibility, networking, or any client code.

```bash
pnpm test     # Run tests
pnpm build    # Build all packages
```

## Reference Materials

The [`reference/`](reference/) directory contains the original Flyff v15 C++ source code and game data files for understanding the original game mechanics, protocol, and data structures.

For setting up original game assets (3D models, textures), see [docs/ASSET_SETUP.md](docs/ASSET_SETUP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, code style, and contribution guidelines.

## Community

- **Code of Conduct**: Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.
- **Issues**: Use GitHub Issues for bug reports, feature requests, and questions.
- **Discussions**: Use GitHub Discussions for general questions and community interaction.

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md). **Do not open public issues for security vulnerabilities.**

## License

[Apache License 2.0](LICENSE)

---

*Flyff v15 is a game developed by Aeonsoft/Gala Lab. This project is a non-commercial fan reimplementation for educational purposes.*
