import sqlite3 from "sqlite3";

export function runPromise(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getPromise(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function openDatabasePromise(
  fileName,
  mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX,
) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(fileName, mode, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}
