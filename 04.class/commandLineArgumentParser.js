import minimist from "minimist";

export default class CommandLineArgumentParser {
  #args;
  constructor() {
    this.#args = minimist(process.argv.slice(2));
  }

  get isListMode() {
    return !!this.#args.l;
  }

  get isReferenceMode() {
    return !!this.#args.r;
  }

  get isDestroyMode() {
    return !!this.#args.d;
  }
}
