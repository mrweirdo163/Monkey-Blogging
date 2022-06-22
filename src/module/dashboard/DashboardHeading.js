import React from "react";
import styled, { css } from "styled-components";

const DashboardHeadingStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2em;

  ${(props) =>
    props.responsive === true &&
    css`
      @media screen and (max-width: 1023.98px) {
        margin-bottom: 0;
        transform: translateY(100%);
      }
    `};
`;

const DashboardHeading = ({ title = "", desc = "", responsive = false }) => {
  return (
    <div>
      <DashboardHeadingStyles responsive={responsive}>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </DashboardHeadingStyles>
    </div>
  );
};

export default DashboardHeading;
