import { openDatabasePromise } from "./database-helper.js";

async function main() {
  let db = await openDatabasePromise(":memory:");
  await db.runPromise(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  let record = await db.runPromise("INSERT INTO books (title) VALUES ('test')");
  console.log(`自動採番されたID:${record.lastID}`);
  let result = await db.getPromise("SELECT * FROM books LIMIT 1");
  console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
  await db.runPromise("DROP TABLE books");
}
main();
