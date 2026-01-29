import { promptMemoSelection } from "./prompter.js";

export function listFirstLines(memos) {
  memos.forEach((memo) => {
    console.log(memo.firstLine);
  });
}

export async function showContent(memos) {
  const memo = await promptMemoSelection(
    memos,
    "references",
    "参照したいメモを選択してください",
  );
  console.log(memo.content);
}

export async function selectMemoToDelete(memos) {
  return await promptMemoSelection(
    memos,
    "deletion",
    "削除したいメモを選択してください",
  );
}
