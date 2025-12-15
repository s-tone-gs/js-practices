import sqlite3 from "sqlite3";

export default class Database {
  static connectedDb;

  static #getPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async isTableExists(tableName) {
    return await this.#getPromise(
      "SELECT * FROM sqlite_master WHERE type='table' AND name= ?",
      [tableName],
    );
  }

  static async connect(fileName) {
    this.connectedDb = await new Promise((resolve, reject) => {
      const db = new sqlite3.Database(fileName, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
  }

  static allPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.all(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static runPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
}
