import json from './json/variables.json';

class Variables {
  constructor() {
    this.variables = json;

    this.answers = [];
    this.tags = [];
  }

  addAnswer(answer) {
    this.answers = [...this.answers, answer];
  }

  getAnswers() {
    return this.answers
  }

  getAnswersWithVars() {
    const arr = this.answers.map(answer => {
      const variable = this.getVarByTag(answer.tag)

      return {
        variable,
        value: answer.value
      }
    })

    return arr;
  }

  addTag(tag) {
    this.tags = [...this.tags, tag];
  }

  getTags() {
    return this.tags;
  }

  getVars() {
    return this.variables;
  }

  getVarByTag(tag) {
    return this.variables.find(variable => variable.tag === tag);
  }
}

export default Variables;
