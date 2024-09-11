import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 0.6rem;
  border: 1px solid ${({ error }) => (error ? "#E74C3C" : "#ccc")};
  width: 20rem;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ error, focusBorderColor }) =>
      error ? "#E74C3C" : focusBorderColor || "#50924E"};
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const DynamicInput = ({
  type = "text",
  placeholder,
  error,
  errorMessage,
  ...rest
}) => {
  return (
    <div>
      <StyledInput
        type={type}
        placeholder={placeholder}
        error={error}
        {...rest}
      />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default DynamicInput;
