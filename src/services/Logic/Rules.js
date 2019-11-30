import json from './json/rules.json';

class Rules {
  constructor() {
    this.rules = json;
  }

  getRules() {
    return this.rules;
  }
}

export default Rules;
