import React, { useState } from "react";
import MainContainer from "../../components/containers/mainContainer";
import ScreenTitle from "../../components/texts/screenTitle";
import DynamicInput from "../../components/inputs/dynamicInput";
import DynamicButton from "../../components/buttons/dynamicButton";

const DefundPage = () => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankAccountError, setBankAccountError] = useState("");

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

  const validateBankAccount = () => {
    const parsedBankAccount = bankAccount.replace(/\D/g, ""); // Remove non-numeric characters

    if (parsedBankAccount.trim() === "") {
      setBankAccountError("Bank Account cannot be empty");
    } else if (parsedBankAccount.length < 8 || parsedBankAccount.length > 12) {
      setBankAccountError("Bank Account must be between 8 and 12 digits");
    } else {
      setBankAccountError(""); // Clear error if valid
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError(""); // Clear error on change
  };

  const handleBankAccountChange = (e) => {
    setBankAccount(e.target.value);
    setBankAccountError(""); // Clear error on change
  };

  return (
    <MainContainer>
      <ScreenTitle text={"Defund Screen"} />
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
        placeholder="Bank Account"
        value={bankAccount}
        onChange={handleBankAccountChange}
        onBlur={validateBankAccount}
        error={!!bankAccountError}
        errorMessage={bankAccountError}
      />
      <DynamicButton
        text={"Withdraw Digital Shekel"}
        bg={"#ff0005"}
        hoverbg={"#d60000"}
      />
    </MainContainer>
  );
};

export default DefundPage;
