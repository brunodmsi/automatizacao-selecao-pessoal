import json from './json/variables.json';

class Variables {
  constructor() {
    this.variables = json;
  }

  getVars() {
    return this.variables;
  }

  getVarByTag(tag) {
    const found = this.variables.find(variable => variable.tag === tag);
    console.log(found);
    return found
  }

  addVar({  }) {

  }
}

export default Variables;
