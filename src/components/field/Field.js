import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: min(0.5em, 2vw);
  align-items: flex-start;
  margin-bottom: min(2.2em, 7vw);
  &:last-child {
    margin-bottom: 0;
  }
`;
const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};

export default Field;
