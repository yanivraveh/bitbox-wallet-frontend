import React, { useState } from "react";
import MainContainer from "../../components/containers/mainContainer";
import ScreenTitle from "../../components/texts/screenTitle";
import DynamicInput from "../../components/inputs/dynamicInput";
import DynamicButton from "../../components/buttons/DynamicButton";

const TransferPage = () => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedRecipientError, setSelectedRecipientError] = useState("");

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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError(""); // Clear error on change
  };

  const handleRecipientChange = (e) => {
    setSelectedRecipient(e.target.value);
    setSelectedRecipientError(""); // Clear error on change
  };

  return (
    <MainContainer>
      <ScreenTitle text={"Transfer Screen"} />
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
        placeholder="Recipient"
        value={selectedRecipient}
        onChange={handleRecipientChange}
        onBlur={() => {
          if (selectedRecipient.trim() === "") {
            setSelectedRecipientError("Recipient cannot be empty");
          } else {
            setSelectedRecipientError(""); // Clear error if valid
          }
        }}
        error={!!selectedRecipientError}
        errorMessage={selectedRecipientError}
      />

      <DynamicButton
        text="Send"
        bg={"#4F7AE3"}
        hoverbg={"#2358DC"}
        onClick={() => {
          if (!amountError && !selectedRecipientError) {
            alert("Transfer successful");
          }
        }}
      />

      <DynamicButton to="/addressbook" text="Address Book" />
    </MainContainer>
  );
};

export default TransferPage;
