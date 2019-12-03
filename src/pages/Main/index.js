import React, { useState, useEffect } from "react";
import { Form, Choice } from "@rocketseat/unform";
import { Link } from "react-router-dom";

import { MdRefresh } from "react-icons/md";

import _ from "../../services/Func";
import colors from "../../styles/colors";

import { Container, History, HistoryContainer, Question } from "./styles";

import Rules from "../../services/Logic/Rules";
import Variables from "../../services/Logic/Variables";

const variables = new Variables();
const rules = new Rules();
let values = [];
export default function Main() {
  const [variable, setVariable] = useState({});
  const [tagCounter, setTagCounter] = useState(0);
  const [result, setResult] = useState({});

  useEffect(() => {
    function firstQuestion() {
      const question = rules.checkUnanswered([]);
      values = question.values.map(value => {
        return {
          label: value,
          value
        };
      });
      return question;
    }

    if (rules.getRules().length > 0) setVariable(firstQuestion());
    else
      setVariable({
        display_name: "As regras ainda nao foram definidas.",
        question: ""
      });
  }, []);

  function handleSubmit(data, { resetForm }) {
    if (!data.choice) return;

    setTagCounter(tagCounter + 1);

    const answer = {
      tag: variable.tag,
      value: data.choice
    };
    variables.addAnswer(answer);
    variables.addTag(variable.tag);

    const answers = variables.getAnswers();

    rules.addToHistory(
      rules.priority,
      `Resposta do usuário: ${answers[answers.length - 1].value}`
    );

    const check = rules.checkResult(answers);
    if (check.is === true) {
      setResult(check.result);
    } else {
      const newVariable = rules.checkUnanswered(variables.getTags());

      values = newVariable.values.map(value => {
        return {
          label: value,
          value
        };
      });

      setVariable(newVariable);
    }

    resetForm(data.choice);
  }

  return (
    <Container>
      <header>
        <strong>
          {_.isEmpty(result) ? variable.display_name : result.header}
        </strong>
        {_.isEmpty(result) ? (
          <span>
            {tagCounter + 1}/{variables.getVars().length - 1}
          </span>
        ) : (
          <button type="button" onClick={() => window.location.reload()}>
            <MdRefresh size={20} color={colors.text} />
            <span>Reiniciar</span>
          </button>
        )}
      </header>

      {_.isEmpty(result) ? (
        <Question>
          <Form onSubmit={handleSubmit}>
            <h2>
              {variable.question !== ""
                ? variable.question
                : "Defina as regras"}
            </h2>

            <Choice name="choice" options={values} />

            <button type="submit">OK</button>
          </Form>
        </Question>
      ) : (
        <HistoryContainer>
          <h2>Então...</h2>

          <span>{result.display}</span>

          <h3>Histórico</h3>

          <ul>
            {console.tron.log(rules.getHistory())}
            {rules.getHistory().map((rule, index) => (
              <History key={index}>
                <p>
                  {rule.message}
                  {rule.child.map(c => (
                    <span>- {c}</span>
                  ))}
                </p>
                <div>
                  <span>{rule.child.length} interações</span>
                </div>
              </History>
            ))}
          </ul>
        </HistoryContainer>
      )}
    </Container>
  );
}
