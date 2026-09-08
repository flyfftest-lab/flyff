import Database from 'better-sqlite3';

export class GameDatabase {
  private db: Database.Database;

  constructor(path: string = ':memory:') {
    this.db = new Database(path);
    this.init();
  }

  private init(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        level INTEGER DEFAULT 1,
        x REAL DEFAULT 0,
        y REAL DEFAULT 0,
        z REAL DEFAULT 0,
        hp INTEGER DEFAULT 100,
        maxHp INTEGER DEFAULT 100
      );
    `);
  }

  getPlayer(id: number) {
    return this.db.prepare('SELECT * FROM players WHERE id = ?').get(id);
  }

  savePlayer(id: number, data: any) {
    this.db.prepare('UPDATE players SET level = ?, x = ?, y = ?, z = ?, hp = ? WHERE id = ?')
      .run(data.level, data.x, data.y, data.z, data.hp, id);
  }
}
