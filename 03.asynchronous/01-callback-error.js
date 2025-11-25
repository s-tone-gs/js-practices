import sqlite3 from "sqlite3";

var db = new sqlite3.Database(":memory:", function () {
  createTable(db);
});

function createTable(db) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    function () {
      addRecord(db);
    },
  );
}

function addRecord(db) {
  db.run("INSERT INTO books (title) VALUES (null)", function (err) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`自動採番された ID: ${this.lastID}`);
    }
    getRecord(db);
  });
}

function getRecord(db) {
  db.get("SELECT * FROM hogehoge LIMIT 1", function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
    }
    removeTable(db);
  });
}

function removeTable(db) {
  db.run("DROP TABLE books");
}
