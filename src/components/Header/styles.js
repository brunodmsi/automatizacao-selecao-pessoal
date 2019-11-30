import styled from 'styled-components';

export const Container = styled.div`
  background: #121212;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    h1 {
      color: #f2f2f2;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
