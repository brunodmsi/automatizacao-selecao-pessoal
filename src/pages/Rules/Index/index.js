import React, { useState, useEffect } from 'react';

import { Container, Rule } from './styles';

import Rules from '../../../services/Logic/Rules';
import Variables from '../../../services/Logic/Variables';

export default function RulesIndex() {
  const rules = new Rules();
  const variables = new Variables();

  useEffect(() => {

  })

  return (
    <Container>
      <header>
        <strong>Regras do Sistema</strong>
        {/* <button type="button" onClick={() => clearDetails()}>
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Novo meetup</span>
        </button> */}
      </header>

      <ul>
        {rules.getRules().map(rule => (
          <Rule key={rule.priority}>
            <span>
              Regra {rule.priority}
              <p>{rule.entrys.map((entry, index) => {
                if (index === 0)
                  return (
                    <p>
                      SE {variables.getVarByTag(entry.tag).display_name}
                      &nbsp;= {entry.value}
                    </p>
                  )
                else
                  return (
                    <p>
                      E {variables.getVarByTag(entry.tag).display_name}
                      &nbsp;= {entry.value}
                    </p>
                  )
              })}</p>
            </span>
            <div>
              <span>{rule.value}</span>
            </div>
          </Rule>
        ))}
      </ul>
    </Container>
  );
}
