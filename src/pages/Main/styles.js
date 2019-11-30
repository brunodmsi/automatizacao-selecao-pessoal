import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  p {
    color: #fff;
  }
`;

export const Content = styled.div`
  display: flex;

  width: 100%;
  max-width: 700px;
  height: 100%;
  max-height: 300px;
  text-align: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  background-color: #1F1B24;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;
