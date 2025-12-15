#! /usr/bin/env node

import minimist from "minimist";
import MemoView from "./memoView.js";
import Memo from "./memoClass.js";
import MemoRepository from "./memoRepository.js";

async function listMemo() {
  const memos = await MemoRepository.all();
  MemoView.listMemosStatically(memos);
}

async function createMemo() {
  const content = await MemoView.requireText();
  const newMemo = new Memo(content);
  await MemoRepository.save(newMemo);
}

async function showMemoContent() {
  const memos = await MemoRepository.all();
  if (memos.length === 0) {
    MemoView.noMemo();
    process.exit();
  }
  const { memo } = await MemoView.listReferableMemos(memos);
  console.log(memo.content);
}

async function destroyMemo() {
  const memos = await MemoRepository.all();
  if (memos.length === 0) {
    MemoView.noMemo();
    process.exit();
  }
  const { id } = await MemoView.listDeletableMemos(memos);
  await MemoRepository.delete(id);
}

const args = minimist(process.argv.slice(2));
if (args.l) {
  listMemo();
} else if (args.r) {
  showMemoContent();
} else if (args.d) {
  destroyMemo();
} else {
  createMemo();
}
