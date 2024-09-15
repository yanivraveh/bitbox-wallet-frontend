import React from "react";
import styled from "styled-components";
import { Button, Icon } from "../../components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  width: 360px;
  padding: 32px;
  border-radius: 16px;
  position: relative;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
`;

const Message = styled.p`
  margin: 16px 0;
  color: #293845;
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const Popup = ({ isOpen, onClose, iconName, text, buttons = [] }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContent>
        <CloseButton onClick={onClose}>×</CloseButton>

        {/* Icon */}
        <Icon name={iconName || `logo`} size={56} />

        {/* Message Text */}
        <Message>{text}</Message>

        {/* Buttons (render if available) */}
        {buttons.length > 0 && (
          <ButtonsContainer>
            {buttons.map((button, index) => (
              <Button key={index} text={button.text} onClick={button.onClick} />
            ))}
          </ButtonsContainer>
        )}
      </PopupContent>
    </Overlay>
  );
};

export default Popup;
