import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
        function () {
          console.log(`自動採番されたID:${this.lastID}`);
          db.get("SELECT * FROM books LIMIT 1", (_, book) => {
            console.log(`取得したレコード id:${book.id}, title:${book.title}`);
            db.run("DROP TABLE books");
          });
        },
      );
    },
  );
});
