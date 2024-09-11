import React from "react";
import styled from "styled-components";

const StyledSubtitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  color: #323;
  font-weight: 700;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

const Subtitle = ({ text }) => {
  return <StyledSubtitle id="subtitle">{text}</StyledSubtitle>;
};

export default Subtitle;
