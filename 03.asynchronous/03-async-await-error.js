import { openDatabasePromise } from "./database-helper.js";

async function main() {
  let db = await openDatabasePromise(":memory:");
  await db.runPromise(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  try {
    let record = await db.runPromise("INSERT INTO books (title) VALUES (null)");
    console.log(`自動採番されたID:${record.lastID}`);
  } catch (err) {
    if (err.errno === 19) {
      console.log(err.message);
    }
  }
  try {
    let result = await db.getPromise("SELECT * FROM hogehoge LIMIT 1");
    console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
  } catch (err) {
    if (err.errno === 1) {
      console.log(err.message);
    }
  }
  await db.runPromise("DROP TABLE books");
}
main();
