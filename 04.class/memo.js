#! /usr/bin/env node

import * as memoView from "./memoView.js";
import Memo from "./memoClass.js";
import Option from "./option.js";
import SqliteDbAccessor from "./sqliteDbAccessor.js";
import { connectSqlite } from "./sqlite.js";

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
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  await memoView.show(memos);
}

async function destroy() {
  const memos = await dataAccessObject.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  const trashMemo = await memoView.selectTrash(memos);
  dataAccessObject.destroy(trashMemo.id);
}

async function main() {
  if (option.isList) return await list();

  try {
    if (option.isReference) return await show();

    if (option.isDelete) return await destroy();

    await create();
  } catch (err) {
    if (err instanceof Error && err.code === "ABORT_ERR")
      return console.log("テキスト入力を中断しました。");

    if (err instanceof Error && err.cause === "USER_CANCELLED")
      return console.log(err.message);

    throw err;
  }
}

const connectedDb = await connectSqlite();
const dataAccessObject = new SqliteDbAccessor(connectedDb);
await dataAccessObject.ensureTableExists();
const option = new Option();
main();
