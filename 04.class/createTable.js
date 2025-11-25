import { openDatabasePromise } from "./database.js";

async function createTable() {
  var db = await openDatabasePromise("memos-store");
  await db.runPromise(
    "CREATE TABLE memos (id INTEGER PRIMARY KEY, content text NOT NULL)",
  );
}

createTable();
