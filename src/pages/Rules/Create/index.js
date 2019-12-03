import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Scope } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdAddCircleOutline } from 'react-icons/md';

import { Container } from './styles';
import colors from '../../../styles/colors';

import Rules from '../../../services/Logic/Rules';
import Variables from '../../../services/Logic/Variables';

const rules = new Rules();
const variables = new Variables();
let options = [];
export default function RuleCreate() {
  const [initialPriority, setInitialPriority] = useState({});
  const [entrysCounter, setEntrysCounter] = useState([[]]);

  useEffect(() => {
    const priority = rules.getHighestPriority();

    const result = variables.getVarByTag('resultado');
    options = result.values.map(value => {
      return {
        id: value,
        title: value,
      }
    })

    setInitialPriority({ priority });
  }, [])

  function handleSubmit(data, { resetForm }) {
    // console.tron.log(data);

    let entrys = [{}];
    let tmp = [];
    for (let i = 0; i < Object.keys(data.entrys).length; i += 1) {
      let key;

      for (key in data.entrys) {

        if (key.startsWith(i)) {
          tmp = [...tmp, data.entrys[key]];
        }
      }

      if (tmp.length > 0 && tmp[0] !== "" && tmp[1] !== "") {
        entrys = [...entrys, {
          tag: tmp[0], value: tmp[1]
        }]
      }

      tmp = [];
    }

    const priority = parseInt(data.priority)
    entrys.splice(0, 1);

    if (
      priority <= 0 ||
      priority === null ||
      entrys.length === 0 ||
      data.result === ""
    ) return;

    const obj = {
      priority: data.priority,
      entrys: entrys,
      value: data.result
    }
    rules.addRule(obj);

    toast.success(`Regra ${obj.priority} adicionada com sucesso`)

    resetForm();
  }

  return (
    <Container>
      <header>
        <strong>Adicionar Regra</strong>
      </header>

      <div>
        <Form onSubmit={handleSubmit} initialData={initialPriority}>
          <h2>Prioridade</h2>
          <Input name="priority" placeholder="Qual a prioridade da regra?"/>

          <h2>Resultado</h2>
          <Select name="result" placeholder="Selecione um resultado" options={options}/>

          <h2>
            Entradas
            <MdAddCircleOutline
              color={colors.primary}
              onClick={() => setEntrysCounter(prev => [...prev, 'dummy'])}
            />
          </h2>
          <Scope path="entrys">
            {entrysCounter.map((num, index) => {
              const ifOptions = variables.getVarsWithoutResult().map(variable => {
                return {
                  id: variable.tag,
                  title: variable.tag
                }
              })

              const thenOptions = [
                { id: 'Sim', title: 'Sim' },
                { id: 'Não', title: 'Não' }
              ]
              return (
                <>
                  <h3>Condição {index + 1}</h3>
                  <div>
                    SE&nbsp;<Select name={`${index}SE`} options={ifOptions} />
                    &nbsp;=&nbsp;<Select name={`${index}ENTAO`} options={thenOptions} />
                  </div>
                </>
              )
            })}
          </Scope>

          <button type="submit">OK</button>
        </Form>
      </div>
    </Container>
  );
}
