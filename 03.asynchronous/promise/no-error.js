import {
  openDatabasePromise,
  runPromise,
  getPromise,
} from "../database-helper.js";

let db;
openDatabasePromise(":memory:")
  .then((Connected) => {
    db = Connected;
    return runPromise(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() =>
    runPromise(
      db,
      "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
    ),
  )
  .then((historyOfChanges) => {
    console.log(`自動採番されたID:${historyOfChanges.lastID}`);
    return getPromise(db, "SELECT * FROM books LIMIT 1");
  })
  .then((retrievedBook) => {
    console.log(
      `取得したレコード id:${retrievedBook.id}, title: ${retrievedBook.title}`,
    );
    return runPromise(db, "DROP TABLE books");
  });
