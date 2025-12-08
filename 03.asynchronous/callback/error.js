import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    function () {
      db.run("INSERT INTO books (title) VALUES (null)", function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`自動採番された ID: ${this.lastID}`);
        }
        db.get("SELECT * FROM book LIMIT 1", function (err, book) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`取得したレコード id:${book.id}, title: ${book.title}`);
          }
          db.run("DROP TABLE books");
        });
      });
    },
  );
});
