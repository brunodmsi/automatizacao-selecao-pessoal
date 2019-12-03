import _ from 'lodash';

import json from './json/rules.json';
import Variables from './Variables';

class Rules {
  constructor() {
    this.localStorageName = '@se-internet/rules'

    if (!localStorage.getItem(this.localStorageName))
      localStorage.setItem(this.localStorageName, JSON.stringify(json));

    const get = localStorage.getItem(this.localStorageName);
    this.rules = JSON.parse(get)

    this.priority = 0;

    this.history = []

    this.variables = new Variables();
  }

  updateStorage() {
    const get = localStorage.getItem(this.localStorageName);
    this.rules = JSON.parse(get);
    return this.rules;
  }

  getRules() {
    return this.rules;
  }

  getRuleByPriority(customPriority=0) {
    const p = customPriority !== 0 ? customPriority : this.priority
    return this.rules.find(rule => rule.priority === p);
  }

  getHistory() {
    return this.history;
  }

  getHighestPriority() {
    let num = 0;
    for (let i = 0; i < this.rules.length; i += 1) {
      if (this.rules[i].priority > num) {
        num = this.rules[i].priority;
      }
    }

    return num === 0 ? 1 : num + 1;
  }

  addToHistory(rule, message="") {
    if (!this.history[rule]) {
      this.history[rule] = {
        message: `Entrando na regra ${rule}`,
        child: []
      }
    } else if (this.history[rule] && message !== "") {
      this.history[rule] = {
        ...this.history[rule],
        child: [...this.history[rule].child, message]
      }
    }
  }

  deleteRule(priority) {
    this.rules = this.rules.filter(rule => rule.priority !== priority);

    localStorage.setItem(this.localStorageName, JSON.stringify(this.rules));
    this.reOrderRules()
  }

  addRule({ entrys, value, priority }) {
    const priorityExists = this.rules.find(rule => parseInt(rule.priority) === parseInt(priority))

    if (priorityExists) {
      console.tron.log(this.rules);
      this.rules.splice(priorityExists.priority - 1, 0, {
        value,
        entrys,
        priority
      })
      console.tron.log(this.rules);
    } else {
      this.rules = [...this.rules, {
        entrys, value, priority
      }]
    }

    localStorage.setItem(this.localStorageName, JSON.stringify(this.rules));

    this.reOrderRules();
  }

  checkResult(answers) {
    let tmp = [];
    for (let i = 0; i < this.rules.length; i += 1) {
      const rule = this.getRuleByPriority(i + 1);

      for (let j = 0; j < rule.entrys.length; j += 1) {
        for (let z = 0 ; z < answers.length; z += 1) {
          if (rule.entrys[j].tag === answers[z].tag) {
            const message = `Comparando ${rule.entrys[j].tag} = ${rule.entrys[j].value}`
            if (this.getHistory().indexOf(rule.priority) === -1) this.addToHistory(rule.priority)

            if (!this.getHistory()[rule.priority].child.includes(message)) {
              this.addToHistory(rule.priority, message);
            }
            if (_.isEqual(rule.entrys[j], answers[z])) {
              tmp = [...tmp, true]
            } else {
              tmp = [...tmp, false];
            }
          }
        }
      }

      if (tmp.length === rule.entrys.length) {
        if (this.checkIfArrayIs(tmp, true)) {
          this.addToHistory(
            rule.priority,
            `Regra ${rule.priority} foi aceita`
          )

          this.addToHistory(
            rule.priority,
            `resultado = ${rule.value}`
          )

          this.history.splice(0, 1);

          return {
            is: true,
            result: {
              header: 'Resultado',
              display: rule.value
            }
          }
        }
      }

      tmp = [];
    }

    return {
      is: false
    }
  }

   reOrderRules() {
    this.updateStorage()

    const rules = this.rules.map((rule, index) => {
      rule.priority = index + 1;
      return rule;
    })

    localStorage.setItem(this.localStorageName, JSON.stringify(rules));
  }

  checkUnanswered(responded) {
    if (this.priority === 0) this.priority++;

    let rule;
    if (this.isRuleSatisfied(responded)) {
      this.addToHistory(
        this.priority,
        `Regra ${this.priority} foi rejeitada`
      );
      this.priority++;
      this.addToHistory(this.priority);
      rule = this.getRuleByPriority();
    } else {
      rule = this.getRuleByPriority();
      this.addToHistory(this.priority);
    }

    let unanswered = [];

    for (let i = 0; i < rule.entrys.length; i += 1) {
      if (!responded.includes(rule.entrys[i].tag)) {
        unanswered = [rule.entrys[i].tag];
        console.tron.log(unanswered)
        this.addToHistory(
          this.priority,
          `Perguntando ao usuário sobre ${unanswered[0]}...`
        )
        break;
      }
    }


    let tst;
    if (unanswered.length !== 0) tst = this.variables.getVarByTag(unanswered[0]);
    else return this.checkUnanswered(responded);

    return tst
  }

  isRuleSatisfied(tags) {
    const rule = this.getRuleByPriority();

    const arr = rule.entrys.map(entry => tags.includes(entry.tag))
    const isValid = this.checkIfArrayIs(arr, true);

    return isValid;
  }

  checkIfArrayIs(arr, bool) {
    if (arr.length === 0) return false;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] !== bool) return !bool;
    }

    return bool;
  }
}

export default Rules;
