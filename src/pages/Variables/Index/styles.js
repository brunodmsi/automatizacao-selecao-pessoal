import styled from 'styled-components';
import colors from '../../../styles/colors';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    strong {
      color: ${colors.text};
      font-size: 24px;
      font-weight: bold;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 5px 15px 5px 15px;
      background-color: ${colors.primary};
      border: 0;
      border-radius: 4px;
      transition: 0.2s background;

      :hover {
        background-color: ${darken(0.03, colors.primary)};
      }

      span {
        color: ${colors.text};
        margin-left: 5px;
      }
    }
  }
`;

export const Variable = styled.div`
  background: ${colors.surface};
  color: ${colors.text};
  width: 100%;
  border-radius: 4px;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 10px;
  }

  > span {
    font-weight: bold;
    font-size: 18px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;

    > span {
      font-size: 16px;
      color: #eee;
      opacity: 0.6;
    }

    p {
      margin-left: 10px;

      :hover {
        cursor: pointer;
      }
    }

    button {
      background: none;
      border: 0;
      margin-left: 20px;
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.02, "#fff")};
      }

      svg {
        margin-top: 4px;
      }
    }
  }
`;
