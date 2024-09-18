import React from "react";
import MainContainer from "../../components/containers/mainContainer";
import "./style.css";
import FunctionalContainer from "../../components/containers/functionalContainer";
import ScreenTitle from "../../components/texts/screenTitle";
import Subtitle from "../../components/texts/subtitle";
import DynamicButton from "../../components/buttons/dynamicButton";

const totalBalance = 1000.0;
const totalLocked = 100.0;
function MainPage() {
  return (
    <>
      <MainContainer>
        <ScreenTitle text="Main Screen" />
        <div>
          <h3>Total Balance: {totalBalance} ₪ </h3>
          <h3>Total Locked: {totalLocked} ₪</h3>
        </div>
        <Subtitle text="Recent Transactions" />
        <div></div>
        <Subtitle text="Active Locks" />
        <div>
          <p>Active locks will be displayed here</p>
        </div>
        <section className="main-buttons-container">
          <DynamicButton
            to={"/fund"}
            className="main-screen-buttons"
            text={"Fund"}
            bg={"#50924E"}
            hoverbg={"#396d37"}
          ></DynamicButton>
          <DynamicButton
            to={"/defund"}
            className="main-screen-buttons"
            text={"Defund"}
            bg={"#ff0005"}
            hoverbg={"#d60000"}
          ></DynamicButton>
          <DynamicButton
            to={"/transfer"}
            className="main-screen-buttons"
            text={"Transfer"}
            bg={"#4F7AE3"}
            hoverbg={"#2358DC"}
          ></DynamicButton>
          <DynamicButton
            to={"/lock"}
            className="main-screen-buttons"
            text={"Lock"}
            bg={"#F7B801"}
            hoverbg={"#D89C00"}
          ></DynamicButton>
        </section>
      </MainContainer>
    </>
  );
}

export default MainPage;
