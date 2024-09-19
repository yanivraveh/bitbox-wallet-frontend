import React from "react";
import MainBodyContainer from "../../components/containers/main-body-container.jsx";
import { Button } from "../../components/index.js";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CenteredContainer = styled.div`
  margin-top: 100px;
  max-height: 100%;
`;

const WelcomePage = () => {
  return (
    <>
      <CenteredContainer>
        <MainBodyContainer>
          <div className="padding-top-16">
            <section className="gap-4 flex-column padding-top-16">
              <ButtonContainer>
                <h1 className="text-secondary">Let's Start</h1>

                <Button text="Open existing" />
                <Button appereance={"darkOutlined"} text="Enter wallet ID" />
                <Button
                  to={"/dashboard"}
                  appereance={"darkOutlined"}
                  text="Create new wallet"
                />
              </ButtonContainer>
            </section>
          </div>
        </MainBodyContainer>
      </CenteredContainer>
    </>
  );
};

export default WelcomePage;
