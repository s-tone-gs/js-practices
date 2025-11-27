import { openDatabasePromise } from "./database-helper.js";

let db;
openDatabasePromise(":memory:")
  .then((result) => {
    db = result;
    return db.runPromise(
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    return db.runPromise("INSERT INTO books (title) VALUES (null)");
  })
  .then((record) => {
    console.log(`自動採番されたID:${record.lastID}`);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .then(() => {
    return db.getPromise("SELECT * FROM hogehoge LIMIT 1");
  })
  .then((result) => {
    console.log(`取得したレコード id:${result.id}, title: ${result.title}`);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .then(() => {
    return db.runPromise("DROP TABLE books");
  });
