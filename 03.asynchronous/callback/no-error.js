import sqlite3 from "sqlite3";

let db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    function () {
      db.run(
        "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
        function () {
          console.log(`自動採番された ID: ${this.lastID}`);
          db.get("SELECT * FROM books LIMIT 1", function (_, retrievedBook) {
            console.log(
              `取得したレコード id:${retrievedBook.id}, title: ${retrievedBook.title}`,
            );
            db.run("DROP TABLE books");
          });
        },
      );
    },
  );
});
