import {
  openDatabasePromise,
  runPromise,
  getPromise,
} from "./database-helper.js";

let db = await openDatabasePromise(":memory:");
await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
let record = await runPromise(
  db,
  "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
);
console.log(`自動採番されたID:${record.lastID}`);
let result = await getPromise(db, "SELECT * FROM books LIMIT 1");
console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
await runPromise(db, "DROP TABLE books");
