import React, { useState, useEffect } from "react";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container, Rule } from "./styles";

import colors from "../../../styles/colors";

import Rules from "../../../services/Logic/Rules";
import Variables from "../../../services/Logic/Variables";

const rules = new Rules();
const variables = new Variables();
export default function RulesIndex() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const arr = rules.updateStorage();

    setArray(arr);

    return () => setArray(arr);
  }, []);

  function handleDelete(priority) {
    rules.deleteRule(priority);
    rules.reOrderRules();
    const arr = rules.getRules();
    setArray(arr);
  }

  return (
    <Container>
      <header>
        <strong>Regras do Sistema</strong>
        <button type="button">
          <Link to="/rules/add">
            <MdAddCircleOutline size={20} color={colors.text} />
            <span>Adicionar</span>
          </Link>
        </button>
      </header>

      <ul>
        {array.length === 0 ? (
          <Rule>
            <span>Nenhuma regra registrada :(</span>
            <div>
              <span>Crie a primeira clicando acima!</span>
            </div>
          </Rule>
        ) : (
          <></>
        )}
        {array.map(rule => (
          <Rule key={rule.priority}>
            <span>
              Regra {rule.priority}
              <p>
                {rule.entrys.map((entry, index) => {
                  if (index === 0)
                    return (
                      <p>
                        SE {variables.getVarByTag(entry.tag).display_name}
                        &nbsp;= {entry.value}
                      </p>
                    );
                  else
                    return (
                      <p>
                        E {variables.getVarByTag(entry.tag).display_name}
                        &nbsp;= {entry.value}
                      </p>
                    );
                })}
              </p>
            </span>
            <div>
              <span>{rule.value}</span>
              <p onClick={() => handleDelete(rule.priority)}>
                <MdDelete size={20} color={colors.primary} />
              </p>
            </div>
          </Rule>
        ))}
      </ul>
    </Container>
  );
}
