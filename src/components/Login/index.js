import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Base>
      <h1>ChumStudies</h1>
      <form>
        <p>Email</p>
        <UserInput type="text" />
        <p>Password</p>
        <UserInput type="password" />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Base>
  );
};

const Base = styled.div`
  background-color: #0f2520;
  height: 100vh;
  display: flex;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-size: 50px;
    margin: 30px;
  }

  p {
    color: white;
    font-size: 16px;
    margin: 30px;
  }
`;

const UserInput = styled.input`
  height: 30px;
  resize: none;
  display: block;
  margin: 20px;
`;

const SubmitButton = styled.button`
  height: 30px;
  margin-left: 20px;
`;

export default Login;
