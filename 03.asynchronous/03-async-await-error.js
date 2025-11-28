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
try {
  let historyOfChanges = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (null)",
  );
  console.log(`自動採番されたID:${historyOfChanges.lastID}`);
} catch (err) {
  if (err.errno === 19) {
    console.error(err.message);
  }
}
try {
  let retrievedBook = await getPromise(db, "SELECT * FROM book LIMIT 1");
  console.log(
    `取得したレコード id:${retrievedBook.id}, title: ${retrievedBook.title}`,
  );
} catch (err) {
  if (err.errno === 1) {
    console.error(err.message);
  }
}
await runPromise(db, "DROP TABLE books");
