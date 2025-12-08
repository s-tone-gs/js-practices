import {
  openDatabasePromise,
  runPromise,
  getPromise,
} from "../database-helper.js";

let db = await openDatabasePromise(":memory:");
await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
let historyOfChanges = await runPromise(
  db,
  "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
);
console.log(`自動採番されたID:${historyOfChanges.lastID}`);
let retrievedBook = await getPromise(db, "SELECT * FROM books LIMIT 1");
console.log(
  `取得したレコード id:${retrievedBook.id}, title: ${retrievedBook.title}`,
);
await runPromise(db, "DROP TABLE books");
