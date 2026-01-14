#! /usr/bin/env node

import * as memoView from "./memoView.js";
import Memo from "./memoClass.js";
import Option from "./option.js";
import SqliteDbAccessor from "./sqliteDbAccessor.js";
import { connectSqlite } from "./sqlite.js";

const connectedDb = await connectSqlite();
const dataAccessObject = new SqliteDbAccessor(connectedDb);
await dataAccessObject.ensureTableExists();
const option = new Option();

async function list() {
  const memos = await dataAccessObject.all();
  memoView.list(memos);
}

async function create() {
  const memoFields = await memoView.fillOut();
  const newMemo = new Memo({
    ...memoFields,
  });
  dataAccessObject.save(newMemo.content);
}

async function show() {
  const memos = await dataAccessObject.all();
  await memoView.show(memos);
}

async function destroy() {
  const memos = await dataAccessObject.all();
  const trashMemo = await memoView.selectTrash(memos);
  dataAccessObject.destroy(trashMemo.id);
}

function main() {
  if (option.isList) {
    list();
  } else if (option.isReference) {
    show();
  } else if (option.isDelete) {
    destroy();
  } else {
    create();
  }
}
main();
