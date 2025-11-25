export class Memo {
  constructor(memoObject) {
    this.content = memoObject.content;
    this.id = memoObject.id ? memoObject.id : null;
  }

  getFirstLine() {
    var lines = this.content.split("\n");
    return lines[0];
  }
}
