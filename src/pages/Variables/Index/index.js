import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { Container, Variable } from './styles';

import Variables from '../../../services/Logic/Variables';
import colors from '../../../styles/colors';
import Rules from '../../../services/Logic/Rules';

const variables = new Variables();
const rules = new Rules();
export default function VariablesIndex() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const arr = variables.updateStorage();

    setArray(arr);

    return () => setArray(arr)
  }, []);

  function handleDelete(tag) {
    setArray(array.filter(item => item.tag !== tag));
    variables.deleteVar(tag);
    rules.reOrderRules();
  }

  return (
    <Container>
      <header>
        <strong>Variáveis do Sistema</strong>
        <button type="button">
          <Link to="/variables/add">
            <MdAddCircleOutline size={20} color={colors.text} />
            <span>Adicionar</span>
          </Link>
        </button>
      </header>

      <ul>
        {array.length === 0
          ? (
            <Variable>
              <span>Nenhuma variável registrada :(</span>
              <div>
                <span>Crie a primeira clicando acima!</span>
              </div>
            </Variable>
          ) : (<></>)}
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

              {variable.tag !== 'resultado'
                ? (
                  <p onClick={() => handleDelete(variable.tag)}>
                    <MdDelete size={20} color={colors.primary} />
                  </p>
                ):<></>}
            </div>
          </Variable>
        ))}
      </ul>
    </Container>
  );
}
