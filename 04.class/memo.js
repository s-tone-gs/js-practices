#! /usr/bin/env node

import minimist from "minimist";
import enquirer from "enquirer";
const { Select } = enquirer;
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { openDatabasePromise } from "./database.js";
import { Memo } from "./memo-class.js";

var args = minimist(process.argv.slice(2));
var db = await openDatabasePromise("memos-store");

if (args["l"]) {
  index();
} else if (args["r"]) {
  show();
} else if (args["d"]) {
  destroy();
} else {
  create();
}

async function index() {
  var memos = await db.selectAll();
  memos.forEach((memo) => {
    console.log(memo.getFirstLine());
  });
}

async function create() {
  const rl = readline.createInterface({ input, output });
  var content = await rl.question("保存するメモの内容を入力してください\n");
  rl.on("line", (line) => {
    content += `\n${line}`;
  });
  rl.on("close", async () => {
    await db.insert(new Memo({ content: content }));
  });
}

async function show() {
  var choices = buildChoices();
  var referableMemos = new Select({
    name: "show memos",
    message: "参照したいメモを選んでください",
    choices: choices,
  });
  var selected = await referableMemos.run();
  console.log(selected.content);
}

async function destroy() {
  var choices = buildChoices();
  var deletableMemos = new Select({
    name: "destroy memos",
    message: "削除したいメモを選んでください",
    choices: choices,
  });
  var selected = await deletableMemos.run();
  db.delete(selected);
}

async function buildChoices() {
  var memos = await db.selectAll();
  return memos.map((memo) => {
    return { message: memo.getFirstLine(), value: memo };
  });
}
