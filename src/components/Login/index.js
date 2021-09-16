import { useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import { AUTHENTICATE } from "./gql";

const Login = () => {
  const [authenticate, { loading }] = useMutation(AUTHENTICATE);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await authenticate({ variables: { email, password } });
      const accessToken = data?.authenticate?.tokens?.accessToken ?? null;

      if (!accessToken) {
        console.log("something is wrong");
        return;
      }

      localStorage.setItem("access-token", accessToken);
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Base>
      <h1>ChumStudies</h1>
      <form onSubmit={handleLogin}>
        <p>Email</p>
        <UserInput type="text" name="email" />
        <p>Password</p>
        <UserInput type="password" name="password" />
        <SubmitButton type="submit" disabled={loading}>
          Submit
        </SubmitButton>
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
