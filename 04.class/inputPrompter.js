import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import enquirer from "enquirer";

const { Select } = enquirer;

export default class InputPrompter {
  static async promptMultiLineText(promptMessage, cancelMessage) {
    const rl = readline.createInterface({ input, output });
    let content;
    try {
      content = await rl.question(`${promptMessage}\n`);
    } catch (err) {
      if (err instanceof Error && err.code === "ABORT_ERR") {
        console.error(cancelMessage);
        process.exit();
      } else {
        throw err;
      }
    }
    return new Promise((resolve) => {
      rl.on("line", (line) => {
        content += `\n${line}`;
      });
      rl.on("close", () => {
        resolve(content);
      });
    });
  }

  static async promptSelection(selecterName, message, choices) {
    const selectableMemos = new Select({
      name: selecterName,
      message: message,
      choices: choices,
    });
    try {
      return await selectableMemos.run();
    } catch (err) {
      // 選択を中断した際にerrとして""が投げられる。
      // この挙動はバグとされているが、未修正の模様。 issue: https://github.com/enquirer/enquirer/issues/225
      // 一旦その挙動に従って実装する。
      if (err === "") {
        console.error("選択を中断しました。");
        process.exit();
      } else {
        throw err;
      }
    }
  }
}
