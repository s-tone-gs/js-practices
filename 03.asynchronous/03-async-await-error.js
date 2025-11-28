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
  let record = await runPromise(db, "INSERT INTO books (title) VALUES (null)");
  console.log(`自動採番されたID:${record.lastID}`);
} catch (err) {
  if (err.errno === 19) {
    console.error(err.message);
  }
}
try {
  let result = await getPromise(db, "SELECT * FROM book LIMIT 1");
  console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
} catch (err) {
  if (err.errno === 1) {
    console.error(err.message);
  }
}
await runPromise(db, "DROP TABLE books");
