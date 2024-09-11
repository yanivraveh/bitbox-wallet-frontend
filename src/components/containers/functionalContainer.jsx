import React from "react";
import styled from "styled-components";

const StyledFunctionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ width }) => width || "50%"}; /* default to 50% width */
  background-color: #fff;
  color: #333;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: ${({ side }) =>
    side === "right" ? "0 0 0 auto" : "0 auto 0 0"}; /* align left or right */
`;

const FunctionalContainer = ({ children, width, side }) => {
  return (
    <StyledFunctionalContainer width={width} side={side}>
      {children}
    </StyledFunctionalContainer>
  );
};

export default FunctionalContainer;
