import React, { useState } from "react";
import ScreenTitle from "../../components/texts/screenTitle.jsx";
import Subtitle from "../../components/texts/subtitle.jsx";
import DynamicButton from "../../components/buttons/dynamicButton.jsx";
import MainContainer from "../../components/containers/mainContainer.jsx";
import DynamicInput from "../../components/inputs/dynamicInput.jsx";

const WelcomePage = () => {
  const [walletId, setWalletId] = useState("");
  const [walletIdError, setWalletIdError] = useState("");

  const validateWalletId = () => {
    const parsedWalletId = walletId.replace(/\D/g, ""); // Remove non-numeric characters

    if (parsedWalletId.trim() === "") {
      setWalletIdError("Wallet ID cannot be empty");
    } else if (parsedWalletId.length < 6 || parsedWalletId.length > 12) {
      setWalletIdError("Wallet ID must be between 6 and 12 digits");
    } else {
      setWalletIdError(""); // Clear error if valid
    }
  };

  const handleWalletIdChange = (e) => {
    setWalletId(e.target.value);
    setWalletIdError(""); // Clear error on change
  };

  return (
    <>
      <MainContainer>
        <ScreenTitle text="Welcome" />
        <Subtitle text="Digital Shekel Wallet" />
        <DynamicInput
          type="text"
          placeholder="Enter your wallet ID"
          value={walletId}
          onChange={handleWalletIdChange}
          onBlur={validateWalletId}
          error={!!walletIdError}
          errorMessage={walletIdError}
        />

        <DynamicButton
          text={"Open Existing Wallet"}
          bg={"#50924E"}
          hoverbg={"#396d37"}
          to={"/main"}
        />
        <DynamicButton
          text={"Create New Wallet"}
          hoverbg={"#2358DC"}
          bg={"#4F7AE3"}
        />
      </MainContainer>
    </>
  );
};

export default WelcomePage;
