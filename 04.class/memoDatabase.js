import Database from "./database.js";
import Memo from "./memoClass.js";

export default class MemoDatabase {
  static #FILE_NAME = "memos-store";
  // TABLE_NAMEを各sql文に埋め込んでいる。保存先のファイルが変わった際の修正箇所を減らすため
  // 静的な値であるため、sqlインジェクションの考慮は不要であるという前提で実装している
  static #TABLE_NAME = "memos";

  static async #ensureDbConnection() {
    if (!Database.connectedDb) {
      await Database.connect(this.#FILE_NAME);
    }
  }

  static async #ensureTableExists() {
    if (!(await Database.isTableExists(this.#TABLE_NAME))) {
      await Database.runPromise(
        `CREATE TABLE ${this.#TABLE_NAME} (id INTEGER PRIMARY KEY, content text NOT NULL)`,
      );
    }
  }

  static async all() {
    await this.#ensureDbConnection();
    await this.#ensureTableExists();
    const memos = await Database.allPromise(
      `SELECT * FROM ${this.#TABLE_NAME}`,
    );
    return memos.map((memo) => ({
      id: memo.id,
      memo: new Memo(memo.content),
    }));
  }

  static async delete(id) {
    await this.#ensureDbConnection();
    await this.#ensureTableExists();
    await Database.runPromise(`DELETE FROM ${this.#TABLE_NAME} WHERE id = ?`, [
      id,
    ]);
  }

  static async save(memo) {
    await this.#ensureDbConnection();
    await this.#ensureTableExists();
    await Database.runPromise(
      `INSERT INTO ${this.#TABLE_NAME} (content) VALUES (?)`,
      [memo.content],
    );
  }
}
