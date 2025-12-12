export default class Memo {
  constructor(content) {
    this.content = content;
  }

  getFirstLine() {
    const lines = this.content.split("\n");
    return lines[0];
  }
}
