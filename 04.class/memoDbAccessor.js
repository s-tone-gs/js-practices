import * as sqliteWrapper from "./sqliteWrapper.js";
import Memo from "./memoClass.js";

export default class MemoDbAccessor {
  constructor(connectedDb) {
    this.connectedDb = connectedDb;
    this.tableName = "memos";
  }

  async ensureTableExists() {
    await sqliteWrapper.run(
      this.connectedDb,
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY, content text NOT NULL)`,
    );
  }

  async all() {
    const memos = await sqliteWrapper.all(
      this.connectedDb,
      `SELECT * FROM ${this.tableName} ORDER BY id ASC`,
    );
    return memos.map(
      ({ id, content }) =>
        new Memo({
          id,
          content,
        }),
    );
  }

  async destroy(id) {
    await sqliteWrapper.run(
      this.connectedDb,
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id],
    );
  }

  async save(content) {
    await sqliteWrapper.run(
      this.connectedDb,
      `INSERT INTO ${this.tableName} (content) VALUES (?)`,
      [content],
    );
  }
}
