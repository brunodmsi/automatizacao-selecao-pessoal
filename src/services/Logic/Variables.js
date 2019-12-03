
import json from './json/variables.json';

class Variables {
  constructor() {
    this.localStorageName = '@se-internet/variables'

    if (!localStorage.getItem(this.localStorageName))
      localStorage.setItem(this.localStorageName, JSON.stringify(json));

    const get = localStorage.getItem(this.localStorageName);
    this.variables = JSON.parse(get)

    this.answers = [];
    this.tags = [];
  }

  updateStorage() {
    const get = localStorage.getItem(this.localStorageName);
    this.variables = JSON.parse(get);
    return this.variables;
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

    this.variables = [...this.variables, {
      id: greatestId !== 0 ? greatestId + 1 : 1,
      tag: variable,
      question,
      display_name: display,
      values: ['Sim', 'Não']
    }]

    this.saveVariables();
  }

  saveVariables() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.variables));
    const get = localStorage.getItem(this.localStorageName);
    this.variables = JSON.parse(get);
  }

  deleteVar(tag) {
    this.variables = this.variables.filter(item => item.tag !== tag);

    const get = localStorage.getItem('@se-internet/rules');
    const rules = JSON.parse(get);
    const newRules = rules.filter(rule => !rule.entrys.find(entry => entry.tag === tag))
    localStorage.setItem('@se-internet/rules', JSON.stringify(newRules));

    this.saveVariables();
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

  getVarsWithoutResult() {
    return this.variables.filter(variable => variable.tag !== 'resultado');
  }

  getVarByTag(tag) {
    return this.variables.find(variable => variable.tag === tag);
  }
}

export default Variables;
