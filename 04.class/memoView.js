import InputPrompter from "./inputPrompter.js";

export default class MemoView {
  static staticList(memos) {
    for (const memoWithId of memos) {
      console.log(memoWithId.memo.getFirstLine());
    }
  }

  static async create() {
    return await InputPrompter.promptMultiLineText(
      "メモを入力してください",
      "メモが保存されずに終了しました",
    );
  }

  static #buildMemoChoice(memos) {
    return memos.map((memoWithId) => {
      return {
        message: memoWithId.memo.getFirstLine(),
        value: memoWithId,
      };
    });
  }

  static async refarableList(memos) {
    const refarableMemos = this.#buildMemoChoice(memos);
    return await InputPrompter.promptSelection(
      "reference",
      "参照したいメモを選択してください",
      refarableMemos,
    );
  }

  static showContent(memo) {
    console.log(memo.content);
  }

  static async deletableList(memos) {
    const deletableMemos = this.#buildMemoChoice(memos);
    return await InputPrompter.promptSelection(
      "deletion",
      "削除したいメモを選択してください",
      deletableMemos,
    );
  }

  static noMemo() {
    console.error("メモがありません");
  }
}
