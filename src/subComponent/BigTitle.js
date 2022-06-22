import React from "react";
import styled from "styled-components";

const Text = styled.h1`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  color: ${(props) => `rgba(0, 0, 0, 0.4)`};
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: calc(5rem + 5vw);
  pointer-events: none;
  z-index: 0;
`;

const BigTitle = (props) => {
  return (
    <Text top={props.top} left={props.left} right={props.right}>
      {props.text}
    </Text>
  );
};

export default BigTitle;
