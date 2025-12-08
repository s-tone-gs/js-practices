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
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (null)"))
  .then((historyOfChanges) => {
    console.log(`自動採番されたID:${historyOfChanges.lastID}`);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => getPromise(db, "SELECT * FROM book LIMIT 1"))
  .then((book) => {
    console.log(`取得したレコード id:${book.id}, title: ${book.title}`);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => runPromise(db, "DROP TABLE books"));
