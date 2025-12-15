import Input from "./input.js";

export default class MemoView {
  static staticListOfMemos(memos) {
    for (const memoWithId of memos) {
      console.log(memoWithId.memo.getFirstLine());
    }
  }

  static async create() {
    return await Input.provideMultiLineTextField(
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

  static async ListOfReferableMemos(memos) {
    const refarableMemos = this.#buildMemoChoice(memos);
    return await Input.provideInteractiveSelectList(
      "reference",
      "参照したいメモを選択してください",
      refarableMemos,
    );
  }

  static showContent(memo) {
    console.log(memo.content);
  }

  static async ListOfDeletableMemos(memos) {
    const deletableMemos = this.#buildMemoChoice(memos);
    return await Input.provideInteractiveSelectList(
      "deletion",
      "削除したいメモを選択してください",
      deletableMemos,
    );
  }

  static noMemo() {
    console.error("メモがありません");
  }
}
