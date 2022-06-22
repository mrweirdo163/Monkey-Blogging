import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.darkGray};
  font-size: min(1em, 3vw);
  line-height: 30px;
  font-weight: 600;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
