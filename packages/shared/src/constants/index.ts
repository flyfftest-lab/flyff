// Game constants and opcodes

export const OPCODES = {
  CERTIFY: 0x001,
  LOGIN: 0x002,
  CHARACTER_LIST: 0x003,
  CHARACTER_CREATE: 0x004,
  CHARACTER_SELECT: 0x005,
  CHARACTER_DELETE: 0x006,
  MOVE: 0x100,
  ATTACK: 0x101,
  DAMAGE: 0x102,
  HEAL: 0x103,
  CHAT: 0x200,
  SNAPSHOT: 0x300,
} as const;

export const SERVER_TICK_RATE = 200; // ms
export const MAX_PLAYERS = 1000;
export const MAX_MONSTERS = 5000;
