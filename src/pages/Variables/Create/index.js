import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

import Variables from '../../../services/Logic/Variables';

const variables = new Variables();
export default function Create() {
  const [variable, setVariable] = useState();

  function handleSubmit(data) {
    if (!data.variable || !data.question || !data.display) return;
    const obj = {
      variable: data.variable,
      question: data.question,
      display: data.display
    }
    variables.addVar(obj)
  }

  return (
    <Container>
      <header>
        <strong>Adicionar Variável</strong>
      </header>

      <div>
        <Form onSubmit={handleSubmit}>
          <h2>Nome de visualização</h2>
          <Input name="display" />
          <h2>Variável</h2>
          <Input name="variable" />
          <h2>Pergunta</h2>
          <Input name="question" />

          <button type="submit">OK</button>
        </Form>
      </div>
    </Container>
  );
}
