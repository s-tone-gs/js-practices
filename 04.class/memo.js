#! /usr/bin/env node

import minimist from "minimist";
import enquirer from "enquirer";
const { Select } = enquirer;
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Database } from "./database.js";
import { Memo } from "./memo-class.js";

const args = minimist(process.argv.slice(2));
await Database.connect();

if (args.l) {
  index();
} else if (args.r) {
  show();
} else if (args.d) {
  destroy();
} else {
  create();
}

async function index() {
  const memos = await Database.selectAll();
  memos.forEach((memo) => {
    console.log(memo.getFirstLine());
  });
}

async function create() {
  const rl = readline.createInterface({ input, output });
  let content;
  try {
    content = await rl.question("保存するメモの内容を入力してください\n");
  } catch (err) {
    if (err instanceof Error && err.code === "ABORT_ERR") {
      console.log("メモが保存されずに終了しました");
      process.exit();
    } else {
      throw err;
    }
  }
  rl.on("line", (line) => {
    content += `\n${line}`;
  });
  rl.on("close", async () => {
    await Database.insert(new Memo({ content: content }));
  });
}

async function show() {
  const choices = await buildChoices();
  if (choices.length === 0) {
    console.log("参照できるメモがありません");
    process.exit();
  }
  const referableMemos = new Select({
    name: "show memos",
    message: "参照したいメモを選んでください",
    choices: choices,
  });
  let selectedMemo;
  try {
    selectedMemo = await referableMemos.run();
  } catch (err) {
    // Ctrl+Cでキャンセルが行われたとき、errとして""が投げられる
    // この挙動はバグとされているが、未修正の模様。 issue: https://github.com/enquirer/enquirer/issues/225
    // 一旦その挙動に従って実装する。
    if (err === "") {
      console.log("選択を中断しました。");
      process.exit();
    } else {
      throw err;
    }
  }
  console.log(selectedMemo.content);
}

async function destroy() {
  const choices = await buildChoices();
  if (choices.length === 0) {
    console.log("削除できるメモがありません");
    process.exit();
  }
  const deletableMemos = new Select({
    name: "destroy memos",
    message: "削除したいメモを選んでください",
    choices: choices,
  });
  let selectedMemo;
  try {
    selectedMemo = await deletableMemos.run();
  } catch (err) {
    if (err === "") {
      console.log("選択を中断しました。");
      process.exit();
    } else {
      throw err;
    }
  }
  Database.delete(selectedMemo);
}

async function buildChoices() {
  const memos = await Database.selectAll();
  return memos.map((memo) => {
    return { message: memo.getFirstLine(), value: memo };
  });
}
