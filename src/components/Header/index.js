import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <h1>
            <Link to="/">Diagnóstico de Internet</Link>
          </h1>
        </nav>

        <aside>
          <span>
            <Link to="/variables">Variáveis</Link>
          </span>
          &nbsp; | &nbsp;
          <span>
            <Link to="/rules">Regras</Link>
          </span>
        </aside>
      </Content>
    </Container>
  );
}
