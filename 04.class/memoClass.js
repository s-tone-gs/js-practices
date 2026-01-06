export default class Memo {
  #dataAccessObject;
  #content;
  #id;

  constructor({ dataAccessObject, id, content }) {
    this.#dataAccessObject = dataAccessObject;
    this.#content = content;
    this.#id = id;
  }

  get firstLine() {
    const lines = this.#content.split("\n");
    return lines[0];
  }

  get content() {
    return this.#content;
  }

  set content(text) {
    this.#content = text;
  }

  static async all(dataAccessObject) {
    const memos = await dataAccessObject.all();
    return memos.map(
      (memo) =>
        new this({
          dataAccessObject,
          content: memo.content,
          id: memo.id,
        }),
    );
  }

  async destroy() {
    await this.#dataAccessObject.destroy(this.#id);
  }

  async save() {
    await this.#dataAccessObject.save(this.#content);
  }
}
