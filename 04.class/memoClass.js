export default class Memo {
  constructor(content) {
    this.content = content;
  }

  get firstLine() {
    const lines = this.content.split("\n");
    return lines[0];
  }
}
