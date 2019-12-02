import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { Container, Variable } from './styles';

import Variables from '../../../services/Logic/Variables';
import colors from '../../../styles/colors';

const variables = new Variables();
export default function VariablesIndex() {
  const [array, setArray] = useState(variables.getVars());

  useEffect(() => {
    console.tron.log(variables.getVars());
  }, [array]);

  function handleDelete(tag) {
    const newVars = variables.deleteVar(tag);
    setArray(newVars);
  }

  return (
    <Container>
      <header>
        <strong>Variáveis do Sistema</strong>
        <button type="button">
          <Link to="/variables/add">
            <MdAddCircleOutline size={20} color={colors.text} />
            <span>Nova variável</span>
          </Link>
        </button>
      </header>

      <ul>
        {array.map(variable => (
          <Variable key={variable.id}>
            <span>{variable.display_name}</span>
            <div>
              <span>{variable.values.map((value, index, array) => {
                if (index === array.length - 1)
                  return `${value}`
                else
                  return `${value}/`
              })}</span>

              <p onClick={() => handleDelete(variable.tag)}>
                <MdDelete size={20} color={colors.primary} />
              </p>
            </div>
          </Variable>
        ))}
      </ul>
    </Container>
  );
}
