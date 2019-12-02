import React, { useState, useEffect } from 'react';
import { Form, Choice } from '@rocketseat/unform';

import _ from '../../services/Func';

import { Container, History } from './styles';

import Rules from '../../services/Logic/Rules';
import Variables from '../../services/Logic/Variables';

const variables = new Variables();
const rules = new Rules();
export default function Main() {
  const [variable, setVariable] = useState(() => {
    if (rules.priority === 0) return rules.checkUnanswered([])
  });
  const [tagCounter, setTagCounter] = useState(0);
  const [result, setResult] = useState({});

  function handleSubmit(data) {
    if (!data.choice) return;

    setTagCounter(tagCounter + 1);

    const answer = {
      tag: variable.tag,
      value: data.choice
    }
    variables.addAnswer(answer);
    variables.addTag(variable.tag);

    // console.log(variables.getAnswers())

    const check = rules.checkResult(variables.getAnswers());
    console.log(`#${rules.priority} check ${JSON.stringify(check)}`);
    if (check.is === true){
      setResult(check.result);
    } else {
      const newVariable = rules.checkUnanswered(variables.getTags());
      setVariable(newVariable);
    }
  }

  return (
    <Container>
      <header>
        <strong>{_.isEmpty(result)
                  ? variable.display_name
                  : result.header}
        </strong>
        {_.isEmpty(result)
        ? (
          <span>{tagCounter + 1}/{variables.getVars().length - 1}</span>
        ) : (<></>)}
      </header>

      <div>
        {_.isEmpty(result) ? (
          <Form onSubmit={handleSubmit}>
            <h2>{variable.question}</h2>

            <Choice
              name="choice"
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' }
              ]}
            />

            <button type="submit">OK</button>
          </Form>
        ) : (
          <div>
            <h2>
              Então...
            </h2>

            <span>{result.display}</span>

            <h3>Histórico</h3>

            <ul>
              {variables.getAnswersWithVars().map(answer => (
                <History>
                  <span>{answer.variable.display_name}</span>
                  <div>
                    <span>{answer.value}</span>
                  </div>
                </History>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
