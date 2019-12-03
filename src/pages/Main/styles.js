import styled from 'styled-components';
import colors from '../../styles/colors';
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

    span {
      color: #eee;
      opacity: 0.6;
    }
  }
`;

export const Question = styled.div`
  background: ${colors.surface};
  color: ${colors.text};
  width: 100%;
  border-radius: 4px;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      margin-bottom: 20px;
    }

    label {
      margin-bottom: 10px;
    }

    button {
      margin-top: 10px;

      padding: 10px 30px 10px 30px;
      align-items: center;
      justify-content: center;

      background-color: ${colors.primary};
      border-radius: 4px;
      border: 0;

      color: #000;
      font-weight: 600;
    }
  }
`;

export const HistoryContainer = styled.div`
  h2, span, h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.text};
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 25px;
    margin-top: 30px;
  }

  > span {
    padding: 10px 10px 10px 10px;
    background-color: ${colors.secondary};
    font-size: 18px;
  }
`;

export const History = styled.div`
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

  > p {
    display: flex;
    float: left;
    flex-direction: column;
    font-weight: bold;
    font-size: 18px;

    span {
      font-weight: normal;
      align-self: flex-start;
      margin-left: 20px;
    }
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
