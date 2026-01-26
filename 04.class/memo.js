#! /usr/bin/env node

import * as memoView from "./memoView.js";
import Memo from "./memoClass.js";
import OptionFlag from "./optionFlag.js";
import MemoDbAccessor from "./memoDbAccessor.js";
import { connectSqlite } from "./sqliteWrapper.js";

async function list(dataAccessObject) {
  const memos = await dataAccessObject.all();
  memoView.list(memos);
}

async function create(dataAccessObject) {
  const memoFields = await memoView.fillOut();
  const newMemo = new Memo({
    ...memoFields,
  });
  dataAccessObject.save(newMemo.content);
}

async function show(dataAccessObject) {
  const memos = await dataAccessObject.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  await memoView.show(memos);
}

async function destroy(dataAccessObject) {
  const memos = await dataAccessObject.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  const trashMemo = await memoView.selectTrash(memos);
  dataAccessObject.destroy(trashMemo.id);
}

async function main() {
  const connectedDb = await connectSqlite("memoStore.sqlite");
  const dataAccessObject = new MemoDbAccessor(connectedDb);
  await dataAccessObject.ensureTableExists();
  const optionFlag = new OptionFlag();

  if (optionFlag.isList) return await list(dataAccessObject);

  try {
    if (optionFlag.isReference) return await show(dataAccessObject);

    if (optionFlag.isDelete) return await destroy(dataAccessObject);

    await create(dataAccessObject);
  } catch (err) {
    if (err instanceof Error && err.code === "ABORT_ERR")
      return console.log("テキスト入力を中断しました。");

    if (err instanceof Error && err.cause === "USER_CANCELLED")
      return console.log(err.message);

    throw err;
  }
}

main();
