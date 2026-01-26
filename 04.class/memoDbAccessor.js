import * as sqliteWrapper from "./sqliteWrapper.js";
import Memo from "./memoClass.js";

export default class MemoDbAccessor {
  static TABLE_NAME = "memos";

  constructor(connectedDb) {
    this.connectedDb = connectedDb;
  }

  async ensureTableExists() {
    await sqliteWrapper.run(
      this.connectedDb,
      `CREATE TABLE IF NOT EXISTS ${this.constructor.TABLE_NAME} (id INTEGER PRIMARY KEY, content text NOT NULL)`,
    );
  }

  async all() {
    const memos = await sqliteWrapper.all(
      this.connectedDb,
      `SELECT * FROM ${this.constructor.TABLE_NAME} ORDER BY id ASC`,
    );
    return memos.map(
      ({ id, content }) =>
        new Memo({
          content,
          id,
        }),
    );
  }

  async destroy(id) {
    await sqliteWrapper.run(
      this.connectedDb,
      `DELETE FROM ${this.constructor.TABLE_NAME} WHERE id = ?`,
      [id],
    );
  }

  async save(content) {
    await sqliteWrapper.run(
      this.connectedDb,
      `INSERT INTO ${this.constructor.TABLE_NAME} (content) VALUES (?)`,
      [content],
    );
  }
}
