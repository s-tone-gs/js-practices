#! /usr/bin/env node

import * as memoView from "./memoView.js";
import MemoAppOptionFlag from "./memoAppOptionFlag.js";
import MemoDbAccessor from "./memoDbAccessor.js";
import { connectDatabase } from "./sqliteWrapper.js";
import { promptMultiLineText } from "./prompter.js";

async function listMemo(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  memoView.listFirstLines(memos);
}

async function createMemo(memoDbAccessor) {
  const content = await promptMultiLineText();
  memoDbAccessor.save(content);
}

async function showMemo(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  await memoView.showSelectedMemoContent(memos);
}

async function deleteMemo(memoDbAccessor) {
  const memos = await memoDbAccessor.all();
  if (memos.length === 0) {
    console.log("メモがありません");
    return;
  }
  const memo = await memoView.selectMemoToDelete(memos);
  memoDbAccessor.delete(memo.id);
}

async function main() {
  const connectedDb = await connectDatabase("memoStore.sqlite");
  const memoDbAccessor = new MemoDbAccessor(connectedDb);
  await memoDbAccessor.ensureTableExists();
  const memoAppOptionFlag = new MemoAppOptionFlag();

  try {
    if (memoAppOptionFlag.isList) {
      await listMemo(memoDbAccessor);
    } else if (memoAppOptionFlag.isReference) {
      await showMemo(memoDbAccessor);
    } else if (memoAppOptionFlag.isDelete) {
      await deleteMemo(memoDbAccessor);
    } else {
      await createMemo(memoDbAccessor);
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
