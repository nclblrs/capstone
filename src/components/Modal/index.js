import styled from "styled-components";
import usePortal from "react-useportal";

const Modal = ({ title, show, closeModal, width, children }) => {
  const { Portal } = usePortal();

  const handleClickOutside = () => {
    closeModal();
  };

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  if (!show) return null;

  return (
    <Portal>
      <ModalBackground onClick={handleClickOutside}>
        <Container width={width} onClick={handleClickInside}>
          <Header>
            <span>{title}</span>
            <span className="closeButton" onClick={closeModal}>
              ×
            </span>
          </Header>
          <Content>{children}</Content>
        </Container>
      </ModalBackground>
    </Portal>
  );
};

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
`;

const Container = styled.div`
  background-color: white;
  width: ${({ width }) => width || "max-content"};
  border-radius: 4px;
`;

const Header = styled.div`
  background-color: #0f482f;
  width: 100%;
  height: 42px;
  border-radius: 4px 4px 0 0;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: white;
  }

  & .closeButton {
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const Content = styled.div`
  padding: 20px;
`;

export default Modal;
