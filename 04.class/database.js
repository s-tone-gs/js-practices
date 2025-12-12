import sqlite3 from "sqlite3";

export default class Database {
  static connectedDb;

  static #getPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.get(sql, param, (err, row) => {
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

  static allPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.all(sql, param, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static runPromise(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.connectedDb.run(sql, param, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
}
