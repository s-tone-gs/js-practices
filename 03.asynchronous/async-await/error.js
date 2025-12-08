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
try {
  const historyOfChanges = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (null)",
  );
  console.log(`自動採番されたID:${historyOfChanges.lastID}`);
} catch (err) {
  if (err !== null && err !== undefined && err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  const retrievedBook = await getPromise(db, "SELECT * FROM book LIMIT 1");
  console.log(
    `取得したレコード id:${retrievedBook.id}, title: ${retrievedBook.title}`,
  );
} catch (err) {
  if (err !== null && err !== undefined && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runPromise(db, "DROP TABLE books");
