import * as Sqlite from "./sqlite.js";

export default class SqliteDbAccessor {
  static TABLE_NAME = "memos";

  constructor(connectedDb) {
    this.connectedDb = connectedDb;
  }

  async ensureTableExists() {
    await Sqlite.run(
      this.connectedDb,
      `CREATE TABLE IF NOT EXISTS ${this.constructor.TABLE_NAME} (id INTEGER PRIMARY KEY, content text NOT NULL)`,
    );
  }

  async all() {
    return await Sqlite.all(
      this.connectedDb,
      `SELECT * FROM ${this.constructor.TABLE_NAME}`,
    );
  }

  async destroy(id) {
    await Sqlite.run(
      this.connectedDb,
      `DELETE FROM ${this.constructor.TABLE_NAME} WHERE id = ?`,
      [id],
    );
  }

  async save(content) {
    await Sqlite.run(
      this.connectedDb,
      `INSERT INTO ${this.constructor.TABLE_NAME} (content) VALUES (?)`,
      [content],
    );
  }
}
