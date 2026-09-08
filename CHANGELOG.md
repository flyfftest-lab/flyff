# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Open-source documentation: CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md
- GitHub issue templates (bug report, feature request, question)
- GitHub pull request template
- README badges for license, Node.js, TypeScript, and PRs welcome

## [0.1.0] - 2024-XX-XX

### Added
- Initial release
- Login server with authentication (WebSocket :28000)
- Game server with world simulation (WebSocket :2000)
- WASM client (C++ Neuz → Emscripten/WebAssembly)
- Binary protocol matching original CAr format
- Character creation and selection
- 3D terrain with click-to-move movement
- Monster spawning with FSM AI
- Melee combat with damage calculation
- HP/MP/FP regeneration
- Experience and leveling
- Chat system
- Spatial hash grid for entity visibility
- HUD: HP/MP/FP/EXP bars, gold, level, chat

---

## Release Notes

### Versioning

- **Major**: Breaking changes to protocol, database schema, or public APIs
- **Minor**: New features, significant improvements
- **Patch**: Bug fixes, documentation updates, minor improvements

### How to Update This Changelog

When making changes:
1. Add entries under `[Unreleased]` section
2. Use categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
3. When releasing, move `[Unreleased]` entries to a new version section with the release date
4. Follow [Keep a Changelog](https://keepachangelog.com/) format
