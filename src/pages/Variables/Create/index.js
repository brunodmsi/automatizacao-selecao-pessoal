import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { Container } from './styles';

import Variables from '../../../services/Logic/Variables';

const variables = new Variables();
export default function VariableCreate() {
  function handleSubmit(data, { resetForm }) {
    if (!data.variable || !data.question || !data.display) return;
    if (variables.getVarByTag(data.variable) !== undefined) return;

    const obj = {
      variable: data.variable,
      question: data.question,
      display: data.display
    }
    variables.addVar(obj);

    toast.success(`Variável ${obj.variable} adicionada com sucesso`)

    resetForm();
  }

  return (
    <Container>
      <header>
        <strong>Adicionar Variável</strong>
      </header>

      <div>
        <Form onSubmit={handleSubmit}>
          <h2>Nome de visualização</h2>
          <Input name="display" placeholder="ex: Cabo de Internet"/>
          <h2>Variável</h2>
          <Input name="variable" placeholder="ex: cabo"/>
          <h2>Pergunta</h2>
          <Input name="question" placeholder="ex: O cabo está conectado?"/>

          <button type="submit">OK</button>
        </Form>
      </div>
    </Container>
  );
}
