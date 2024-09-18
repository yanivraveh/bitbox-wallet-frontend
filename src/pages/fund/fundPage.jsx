import React, { useState } from "react";
import MainContainer from "../../components/containers/mainContainer";
import ScreenTitle from "../../components/texts/screenTitle";
import DynamicInput from "../../components/inputs/dynamicInput";
import DynamicButton from "../../components/buttons/dynamicButton";

const FundPage = () => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const validateAmount = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      setAmountError("Amount must be a valid number");
    } else if (amount.trim() === "") {
      setAmountError("Amount cannot be empty");
    } else {
      setAmountError(""); // Clear error if valid
    }
  };

  const validateCardNumber = () => {
    const parsedCardNumber = cardNumber.replace(/\D/g, ""); // Remove non-numeric characters

    if (parsedCardNumber.length !== 16) {
      setCardNumberError("Card Number must be 16 digits");
    } else if (cardNumber.trim() === "") {
      setCardNumberError("Card Number cannot be empty");
    } else {
      setCardNumberError(""); // Clear error if valid
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError(""); // Clear error on change
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    setCardNumberError(""); // Clear error on change
  };

  return (
    <MainContainer>
      <ScreenTitle text={"Fund Screen"} />
      <DynamicInput
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
        onBlur={validateAmount}
        error={!!amountError}
        errorMessage={amountError}
      />
      <DynamicInput
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={handleCardNumberChange}
        onBlur={validateCardNumber}
        error={!!cardNumberError}
        errorMessage={cardNumberError}
      />
      <DynamicButton
        text={"Buy Digital Shekel"}
        bg={"#50924E"}
        hoverbg={"#396d37"}
      />
    </MainContainer>
  );
};

export default FundPage;
