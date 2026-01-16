import { promptMultiLineText, promptMemoSelection } from "./prompter.js";

export function list(memos) {
  memos.map((memo) => console.log(memo.firstLine));
}

export async function fillOut() {
  const content = await promptMultiLineText();
  return { content };
}

export async function show(memos) {
  const memo = await promptMemoSelection(
    memos,
    "references",
    "参照したいメモを選択してください",
  );
  console.log(memo.content);
}

export async function selectTrash(memos) {
  return await promptMemoSelection(
    memos,
    "deletion",
    "削除したいメモを選択してください",
  );
}
