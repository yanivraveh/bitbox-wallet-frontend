import React from "react";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const MainContainer = ({ children }) => {
  return (
    <StyledMainContainer id="main-container" className="gap-10">{children}</StyledMainContainer>
  );
};

export default MainContainer;
