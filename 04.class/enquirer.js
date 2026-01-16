import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import enquirer from "enquirer";

export async function promptMultiLineText() {
  const rl = readline.createInterface({ input, output });
  let content = await rl.question("テキストを入力してください\n");
  return new Promise((resolve) => {
    rl.on("line", (line) => {
      content += `\n${line}`;
    });
    rl.on("close", () => {
      resolve(content);
    });
  });
}

export async function runMemoSelector(memos, name, message) {
  const choices = memos.map((memo) => ({
    message: memo.firstLine,
    value: memo,
  }));

  const selector = new enquirer.Select({
    name,
    message,
    choices,
    format() {
      return this.focused.message;
    },
  });

  try {
    return await selector.run();
  } catch (err) {
    // 選択を中断した際にerrとして""が投げられる。
    // この挙動はバグとされているが、未修正の模様。 issue: https://github.com/enquirer/enquirer/issues/225
    // 分かりにくいので再スローする
    if (err === "") {
      throw new Error("選択を中断しました", { cause: "USER_CANCELLED" });
    } else {
      throw err;
    }
  }
}
