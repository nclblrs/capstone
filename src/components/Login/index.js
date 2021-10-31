import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import styled from "styled-components";

import { AUTHENTICATE } from "./gql";

const Login = () => {
  const [authenticate, { loading }] = useMutation(AUTHENTICATE);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    /* const code = e.target.code.value; */

    try {
      const { data } = await authenticate({
        variables: { email, password /* code */ },
      });
      const accessToken = data?.authenticate?.tokens?.accessToken ?? null;

      if (!accessToken) {
        throw Error("something is wrong");
      }

      localStorage.setItem("access-token", accessToken);
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Base>
      <LoginContainer>
        <h1>ChumStudies</h1>
        <form onSubmit={handleLogin}>
          <input placeholder="Email" type="text" name="email" />
          <input placeholder="Password" type="password" name="password" />
          {/* <p>Two-factor Code (if set)</p> 
          <input type="text" name="code" placeholder="Two-factor code" /> */}
          <PasswordLink to="/forgot-password">Forgot password?</PasswordLink>
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      </LoginContainer>
    </Base>
  );
};

const Base = styled.div`
  background-color: #1e9c63;
  height: 100vh;
  display: flex;
`;

const LoginContainer = styled.div`
  background-color: #36393f;
  width: 30%;
  height: 370px;
  padding: 2em;
  margin: auto;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-size: 35px;
    margin: 0.5em;
    text-align: center;
  }
  input {
    height: 45px;
    width: 100%;
    font-size: 18px;
    padding: 1em;
    margin-top: 20px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
  }
  button {
    margin-top: 30px;
    margin-left: auto;
    display: flex;
    color: white;
    background-color: #1d935d;
    border: none;
    font-size: 16px;
    width: 120px;
    justify-content: center;
    padding: 0.5em;
    cursor: pointer;
  }
`;

const PasswordLink = styled(Link)`
  color: #6fb9b9;
  display: flex;
  margin-top: 20px;
`;

export default Login;
