// Game types and interfaces

export interface Player {
  id: number;
  name: string;
  level: number;
  x: number;
  y: number;
  z: number;
  hp: number;
  maxHp: number;
}

export interface Monster {
  id: number;
  type: number;
  x: number;
  y: number;
  z: number;
  hp: number;
  maxHp: number;
}

export interface Item {
  id: number;
  type: number;
  count: number;
}
