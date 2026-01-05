import sqlite3 from "sqlite3";

const FILE_NAME = "memoStore.sqlite";

export async function connectSqlite() {
  return await new Promise((resolve, reject) => {
    const db = new sqlite3.Database(FILE_NAME, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

export function get(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function all(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function run(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}
