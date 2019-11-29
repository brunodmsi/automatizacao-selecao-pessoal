import json from '../json/variables.json';

class Variables {
  constructor() {
    this.variables = json;
  }

  getVars() {
    return this.variables;
  }

  addVar({  }) {

  }
}

export default Variables;
