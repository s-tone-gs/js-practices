import {
  openDatabasePromise,
  runPromise,
  getPromise,
} from "./database-helper.js";

let db;
openDatabasePromise(":memory:")
  .then((result) => {
    db = result;
    return runPromise(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    return runPromise(
      db,
      "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
    );
  })
  .then((record) => {
    console.log(`自動採番されたID:${record.lastID}`);
    return getPromise(db, "SELECT * FROM books LIMIT 1");
  })
  .then((result) => {
    console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
    return runPromise(db, "DROP TABLE books");
  });
