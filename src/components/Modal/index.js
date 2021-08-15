import styled from "styled-components";

const Modal = ({ title, show, closeModal, width, children }) => {
  if (!show) return null;

  return (
    <ModalBackground>
      <Container width={width}>
        <Header>
          <span>{title}</span>
          <span className="closeButton" onClick={closeModal}>
            ×
          </span>
        </Header>
        <Content>{children}</Content>
      </Container>
    </ModalBackground>
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
  background-color: #ccdbdc;
  width: ${({ width }) => width || "400px"};
  border-radius: 10px;
`;

const Header = styled.div`
  background-color: #003249;
  width: 100%;
  height: 40px;
  border-radius: 10px 10px 0 0;
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
