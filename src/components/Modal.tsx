import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.modalBackground};
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  height: 80%;
  width: 80%;
  margin: auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

const Modal: React.FC<React.PropsWithChildren<{ open: boolean, onClose: () => void }>> = ({ open, onClose, children }) => {
  if (!open) {
    return null;
  }

  return (
    <Main>
      <ModalBody>
        <Close onClick={onClose}>Close</Close>
        {children}
      </ModalBody>
    </Main>
  );
}

export default Modal;