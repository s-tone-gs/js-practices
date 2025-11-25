import sqlite3 from "sqlite3";

class Database extends sqlite3.Database {
  runPromise(...args) {
    return new Promise((resolve, reject) => {
      this.run(...args, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  getPromise(...args) {
    return new Promise((resolve, reject) => {
      this.get(...args, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export function openDatabasePromise(...args) {
  return new Promise((resolve) => {
    var db = new Database(...args, () => {
      resolve(db);
    });
  });
}
