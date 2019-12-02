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

  getGreatestId() {
    let num = 0;
    for (let i = 0; i < this.variables.length; i += 1) {
      if (this.variables[i].id > num) {
        num = this.variables[i].id;
      }
    }

    return num;
  }

  addVar({ question, variable, display }) {
    const greatestId = this.getGreatestId();

    console.tron.log(this.variables);

    this.variables = [...this.variables, {
      id: greatestId + 1,
      tag: variable,
      question,
      display_name: display,
      values: ['Sim', 'Não']
    }]

    console.tron.log(this.variables);

    // this.saveVariable();
  }

  deleteVar(tag) {
    for (let i = 0; i < this.variables.length; i += 1) {
      if (this.variables[i].tag === tag) {
        this.variables.splice(i, 1);
        i -= 1;
      }
    }

    return this.variables;
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
