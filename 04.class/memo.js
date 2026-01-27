#! /usr/bin/env node

import * as memoView from "./memoView.js";
import Memo from "./memoClass.js";
import MemoOptionFlag from "./memoOptionFlag.js";
import MemoDbAccessor from "./memoDbAccessor.js";
import { connect } from "./sqliteWrapper.js";

async function list(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  memoView.list(memos);
}

async function create(memoDbAccessor) {
  const memoFields = await memoView.writeMemo();
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
  const memo = await memoView.selectMemoToDelete(memos);
  memoDbAccessor.destroy(memo.id);
}

async function main() {
  const connectedDb = await connect("memoStore.sqlite");
  const memoDbAccessor = new MemoDbAccessor(connectedDb);
  await memoDbAccessor.ensureTableExists();
  const memoOptionFlag = new MemoOptionFlag();

  try {
    if (memoOptionFlag.isList) {
      await list(memoDbAccessor);
    } else if (memoOptionFlag.isReference) {
      await show(memoDbAccessor);
    } else if (memoOptionFlag.isDelete) {
      await destroy(memoDbAccessor);
    } else {
      await create(memoDbAccessor);
    }
  } catch (err) {
    if (err instanceof Error && err.code === "ABORT_ERR") {
      console.log("テキスト入力を中断しました。");
      return;
    }

    if (err instanceof Error && err.cause === "USER_CANCELLED") {
      console.log(err.message);
      return;
    }

    throw err;
  }
}

main();
