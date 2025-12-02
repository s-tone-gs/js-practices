export class Memo {
  constructor(memo) {
    this.content = memo.content;
    this.id = memo.id ? memo.id : null;
  }

  getFirstLine() {
    let lines = this.content.split("\n");
    return lines[0];
  }
}
