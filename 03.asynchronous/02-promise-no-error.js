import { openDatabasePromise } from "./database-helper.js";

var db;
openDatabasePromise(":memory:")
  .then((result) => {
    db = result;
    return db.runPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    return db.runPromise("INSERT INTO books (title) VALUES ('test')");
  })
  .then((record) => {
    console.log(`自動採番されたID:${record.lastID}`);
    return db.getPromise("SELECT * FROM books LIMIT 1");
  })
  .then((result) => {
    console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
    return db.runPromise("DROP TABLE books");
  });
