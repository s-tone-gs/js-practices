import sqlite3 from "sqlite3";
import Memo from "./memo-class.js";

export default class Database {
  static FILE_NAME = "memos-store";
  static #connectedDb;

  static #getPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.#connectedDb.get(sql, param, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async #isTableExists() {
    return await this.#getPromise(
      "SELECT * FROM sqlite_master WHERE type='table' AND name='memos'",
    );
  }

  static async #createTable() {
    await this.#runPromise(
      "CREATE TABLE memos (id INTEGER PRIMARY KEY, content text NOT NULL)",
    );
  }

  static async connect() {
    this.#connectedDb = await new Promise((resolve, reject) => {
      const db = new sqlite3.Database(this.FILE_NAME, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
    if (!(await this.#isTableExists())) {
      await this.#createTable();
    }
  }

  static #allPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.#connectedDb.all(sql, param, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async selectAll() {
    const memos = await this.#allPromise("SELECT * FROM memos");
    return memos.map(
      (memo) => new Memo({ id: memo.id, content: memo.content }),
    );
  }

  static #runPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.#connectedDb.run(sql, param, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  static async delete(memo) {
    return await this.#runPromise("DELETE FROM memos WHERE id = ?", [memo.id]);
  }

  static async insert(memo) {
    return await this.#runPromise("INSERT INTO memos (content) VALUES (?)", [
      memo.content,
    ]);
  }
}
