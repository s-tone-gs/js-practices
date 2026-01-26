export default class Memo {
  #id;
  #content;

  constructor({ id, content }) {
    this.#id = id;
    this.#content = content;
  }

  get firstLine() {
    const lines = this.#content.split("\n");
    return lines[0];
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }
}
