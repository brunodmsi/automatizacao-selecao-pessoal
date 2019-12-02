import React, { useState, useEffect } from 'react';

import { Container, Variable } from './styles';

import Variables from '../../../services/Logic/Variables';

export default function VariablesIndex() {
  const variables = new Variables();

  return (
    <Container>
      <header>
        <strong>Variáveis do Sistema</strong>
        {/* <button type="button" onClick={() => clearDetails()}>
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Novo meetup</span>
        </button> */}
      </header>

      <ul>
        {variables.getVars().map(variable => (
          <Variable key={variable.id}>
            <span>{variable.display_name}</span>
            <div>
              <span>{variable.values.map((value, index, array) => {
                if (index === array.length - 1)
                  return `${value}`
                else
                  return `${value}/`
              })}</span>
            </div>
          </Variable>
        ))}
      </ul>
    </Container>
  );
}
