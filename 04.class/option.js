import minimist from "minimist";

export default class Option {
  #args;

  constructor() {
    this.#args = minimist(process.argv.slice(2));
  }

  get isList() {
    return !!this.#args.l;
  }

  get isReference() {
    return !!this.#args.r;
  }

  get isDelete() {
    return !!this.#args.d;
  }
}
