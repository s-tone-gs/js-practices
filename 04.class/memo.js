#! /usr/bin/env node

import * as MemoView from "./memoView.js";
import Memo from "./memoClass.js";
import CommandLineArgumentParser from "./commandLineArgumentParser.js";
import SqliteDbAccessor from "./sqliteDbAccessor.js";
import { connectSqlite } from "./sqlite.js";

const connectedDb = await connectSqlite();
const dataAccessObject = new SqliteDbAccessor(connectedDb);
await dataAccessObject.ensureTableExists();
const argumentParser = new CommandLineArgumentParser();

async function list() {
  const memos = await dataAccessObject.all();
  MemoView.list(memos);
}

async function create() {
  const memoFields = await MemoView.create();
  const newMemo = new Memo({
    ...memoFields,
  });
  dataAccessObject.save(newMemo.content);
}

async function show() {
  const memos = await dataAccessObject.all();
  await MemoView.show(memos);
}

async function destroy() {
  const memos = await dataAccessObject.all();
  const memo = await MemoView.destroy(memos);
  dataAccessObject.destroy(memo.id);
}

function main() {
  if (argumentParser.isListMode) {
    list();
  } else if (argumentParser.isReferenceMode) {
    show();
  } else if (argumentParser.isDestroyMode) {
    destroy();
  } else {
    create();
  }
}
main();
