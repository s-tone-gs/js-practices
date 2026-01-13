import { promptMultiLineText, runMemoSelector } from "./enquirer.js";

export function list(memos) {
  memos.map((memo) => console.log(memo.firstLine));
}

export async function create() {
  const content = await promptMultiLineText();
  return { content };
}

export async function show(memos) {
  const memo = await runMemoSelector(
    memos,
    "references",
    "参照したいメモを選択してください",
  );
  console.log(memo.content);
}

export async function destroy(memos) {
  return await runMemoSelector(
    memos,
    "deletion",
    "削除したいメモを選択してください",
  );
}
