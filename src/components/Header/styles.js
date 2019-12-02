import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  background: ${colors.surface};
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
      a {
        font-size: 28px;
        color: ${colors.text};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        color: ${colors.text};

      }
    }
  }
`;
