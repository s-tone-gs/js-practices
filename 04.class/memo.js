#! /usr/bin/env node

import * as memoView from "./memoView.js";
import Memo from "./memoClass.js";
import OptionFlag from "./optionFlag.js";
import MemoDbAccessor from "./memoDbAccessor.js";
import { connectSqlite } from "./sqliteWrapper.js";

async function list(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  memoView.list(memos);
}

async function create(memoDbAccessor) {
  const memoFields = await memoView.fillOut();
  const newMemo = new Memo({
    ...memoFields,
  });
  memoDbAccessor.save(newMemo.content);
}

async function show(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  await memoView.show(memos);
}

async function destroy(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  const trashMemo = await memoView.selectTrash(memos);
  memoDbAccessor.destroy(trashMemo.id);
}

async function main() {
  const connectedDb = await connectSqlite("memoStore.sqlite");
  const memoDbAccessor = new MemoDbAccessor(connectedDb);
  await memoDbAccessor.ensureTableExists();
  const optionFlag = new OptionFlag();

  if (optionFlag.isList) return await list(memoDbAccessor);

  try {
    if (optionFlag.isReference) return await show(memoDbAccessor);

    if (optionFlag.isDelete) return await destroy(memoDbAccessor);

    await create(memoDbAccessor);
  } catch (err) {
    if (err instanceof Error && err.code === "ABORT_ERR")
      return console.log("テキスト入力を中断しました。");

    if (err instanceof Error && err.cause === "USER_CANCELLED")
      return console.log(err.message);

    throw err;
  }
}

main();
