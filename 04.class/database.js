import sqlite3 from "sqlite3";
import { Memo } from "./memo-class.js";

class MemoDatabase extends sqlite3.Database {
  async selectAll() {
    var memos = await this.allPromise("SELECT * FROM memos");
    return memos.map(
      (memo) => new Memo({ id: memo.id, content: memo.content }),
    );
  }
  async delete(memoInstance) {
    return await this.runPromise("DELETE FROM memos WHERE id = ?", [
      memoInstance.id,
    ]);
  }
  async insert(memoInstance) {
    return await this.runPromise("INSERT INTO memos (content) VALUES (?)", [
      memoInstance.content,
    ]);
  }

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

  allPromise(...args) {
    return new Promise((resolve, reject) => {
      this.all(...args, function (err, row) {
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
    var db = new MemoDatabase(...args, () => {
      resolve(db);
    });
  });
}
