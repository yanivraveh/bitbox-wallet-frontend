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

var hideDialog;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.confirmation = this.confirmation.bind(this);
    this.isVisible = this.isVisible.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.success = this.success.bind(this);

    this.state = {
      visible: false,
    }
  }

  /**
  * show save dialog
  *
  * @param {string} title popup title message
  * @return {Promise<boolean>}
  */
  save(props) {
    return this.confirmation({
      title: 'Do you want to save?',
      iconName: 'success_rounded',
    });
  }

  /**
  * show confirmation dialog
  *
  * @param {string} title popup title message
  * @return {Promise<boolean>}
  */
  confirmation(props) {
    return this.showDialog(props);
  }

  /**
   * Determines whether the popup is visible
   * 
   * @returns {boolean}
   */
  isVisible() {
    return this.state.visible;
  }

  /**
  * show a dialog
  *
  * @param {string} title dialog title
  * @param {string} type dialog type. eg confirmation, warining, error
  * @return {Promise<boolean>}
  */
  showDialog({title, okBtnText, iconName, type = 'confirmation'}) {
    let self = this;

    return new Promise(function(resolve, reject) {
      self.setState({
        visible: true,
        okBtnText,
        iconName,
        title,
        type,
      });

      /**
      * hides the dialog
      *
      * @param {boolean} value dialog result yes|no
      */
      hideDialog = (value) => {
        self.setState({
          visible: false,
        });

        resolve(value);
      }
    });
  }

  /**
  * show success/alert dialog
  *
  * @param {string} title popup title message
  * @return {Promise<boolean>}
  */
  success(props) {
    return this.showDialog({
        ...props,
        type: 'alert',
        iconName: 'success_rounded',
        title: props.title || 'The operation was a success!',
        okBtnText: props.okBtnText || 'OK',
        showOkButton: true

    });
}
render() {
  const { visible, type, title, iconName='logo', okBtnText='OK', cancelBtnText='Cancel' } = this.state;
  
  if (!visible) return null;

  return (
    <Overlay>
      <PopupContent>
        {type !== 'alert' && (
          <CloseButton onClick={() => hideDialog(false)}>×</CloseButton>
        )}

        <Icon name={iconName} />

        <Message>{title}</Message>
        
        <ButtonsContainer>
          {type === 'confirmation' ? (
            <>
              <Button key="ok" text={okBtnText} onClick={() => hideDialog(true)} />
              <Button key="cancel" text={cancelBtnText} appereance="outlined" onClick={() => hideDialog(false)} />
            </>
          ) : (
            <Button key="ok" text={okBtnText} onClick={() => hideDialog(true)} />
          )}
        </ButtonsContainer>
      </PopupContent>
    </Overlay>
  );
}
}

// const Popup = ({ isOpen, onClose, iconName, text, buttons = [] }) => {
//   if (!isOpen) return null;

//   return (
//     <Overlay>
//       <PopupContent>
//         <CloseButton onClick={onClose}>×</CloseButton>

//         {/* Icon */}
//         <Icon name={iconName || `logo`} size={56} />

//         {/* Message Text */}
//         <Message>{text}</Message>

//         {/* Buttons (render if available) */}
//         {buttons.length > 0 && (
//           <ButtonsContainer>
//             {buttons.map((button, index) => (
//               <Button key={index} text={button.text} onClick={button.onClick} />
//             ))}
//           </ButtonsContainer>
//         )}
//       </PopupContent>
//     </Overlay>
//   );
// };

export default Popup;
