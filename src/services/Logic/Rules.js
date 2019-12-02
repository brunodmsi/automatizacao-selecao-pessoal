import _ from 'lodash';

import json from './json/rules.json';
import Variables from './Variables';

class Rules {
  constructor() {
    this.rules = json;
    this.priority = 0;

    this.variables = new Variables();
  }

  getRules() {
    return this.rules;
  }

  getRuleByPriority(customPriority=0) {
    const p = customPriority !== 0 ? customPriority : this.priority
    return this.rules.find(rule => rule.priority === p);
  }

  checkResult(answers) {
    // const rule = this.getRuleByPriority();
    // const { entrys } = rule;

    // let tmp = []
    // for (let i = 0; i < entrys.length; i += 1) {
    //   for (let j = 0; j < answers.length; j += 1) {
    //     if (entrys[i].tag === answers[j].tag) {
    //       if (_.isEqual(entrys[i], answers[j])) {
    //         tmp = [...tmp, true];
    //       } else {
    //         tmp = [...tmp, false];
    //       }
    //     }
    //   }
    // }

    // if (tmp.length < entrys.length) return { is: false };

    // if (this.checkIfArrayIs(tmp, true)) {
    //   return {
    //     is: true,
    //     result: {
    //       header: 'Resultado',
    //       display: rule.value
    //     }
    //   }
    // } else {
    //   return {
    //     is: false
    //   }
    // }

    let tmp = [];
    for (let i = 0; i < this.rules.length; i += 1) {
      const rule = this.getRuleByPriority(i + 1);

      for (let j = 0; j < rule.entrys.length; j += 1) {
        for (let z = 0 ; z < answers.length; z += 1) {
          console.log(rule.entrys[j], answers[z])
          if (rule.entrys[j].tag === answers[z].tag) {
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

  checkUnanswered(responded) {
    if (this.priority === 0) this.priority++;

    let rule;
    if (this.isRuleSatisfied(responded)) {
      this.priority++;
      rule = this.getRuleByPriority();
    } else {
      rule = this.getRuleByPriority();
    }

    let unanswered = [];

    for (let i = 0; i < rule.entrys.length; i += 1) {
      if (!responded.includes(rule.entrys[i].tag)) {
        unanswered = [rule.entrys[i].tag];
        break;
      }
    }

    let tst;
    if (unanswered) tst = this.variables.getVarByTag(unanswered[0]);
    else {

    }

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
