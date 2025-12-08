import {
  openDatabasePromise,
  runPromise,
  getPromise,
} from "../database-helper.js";

const db = await openDatabasePromise(":memory:");
await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
const statement = await runPromise(
  db,
  "INSERT INTO books (title) VALUES ('犬でもわかるプログラミング入門')",
);
console.log(`自動採番されたID:${statement.lastID}`);
const book = await getPromise(db, "SELECT * FROM books LIMIT 1");
console.log(`取得したレコード id:${book.id}, title: ${book.title}`);
await runPromise(db, "DROP TABLE books");
