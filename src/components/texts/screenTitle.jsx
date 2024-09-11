import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
  text-align: center;
  color: #333;
  font-weight: 700;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

const ScreenTitle = ({ text }) => {
  return <StyledTitle id="title">{text}</StyledTitle>;
};

export default ScreenTitle;
