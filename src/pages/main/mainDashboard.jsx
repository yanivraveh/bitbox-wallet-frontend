import React from "react";
import "./style.css";
import FunctionalContainer from "../../components/containers/functionalContainer";
import ScreenTitle from "../../components/texts/screenTitle";

import Subtitle from "../../components/texts/subtitle";
import DynamicButton from "../../components/buttons/dynamicButton";
import { Link } from "react-router-dom";

const totalBalance = 1000.0;
const totalLocked = 100.0;
const MainDashboard = () => {
  return (
    <FunctionalContainer>
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
      <section id="main-buttons-container">
        <DynamicButton
          to={"./fund"}
          className="main-screen-buttons"
          text={"Fund"}
          bg={"#50924E"}
          hoverbg={"#396d37"}
        ></DynamicButton>
        <DynamicButton
          className="main-screen-buttons"
          text={"Defund"}
          bg={"#ff0005"}
          hoverbg={"#d60000"}
        ></DynamicButton>
        <DynamicButton
          className="main-screen-buttons"
          text={"Transfer"}
          bg={"#4F7AE3"}
          hoverbg={"#2358DC"}
        ></DynamicButton>
        <DynamicButton
          className="main-screen-buttons"
          text={"Lock"}
          bg={"#F7B801"}
          hoverbg={"#D89C00"}
        ></DynamicButton>
      </section>
    </FunctionalContainer>
  );
};

export default MainDashboard;
