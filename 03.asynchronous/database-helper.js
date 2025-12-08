import sqlite3 from "sqlite3";

export function runPromise(db, ...args) {
  return new Promise((resolve, reject) => {
    db.run(...args, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getPromise(db, ...args) {
  return new Promise((resolve, reject) => {
    db.get(...args, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function openDatabasePromise(...args) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(...args, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}
