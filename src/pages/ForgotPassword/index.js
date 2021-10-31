import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { SEND_RESET_PASSWORD } from "./gql";

const ForgotPassword = () => {
  const [sendResetPasswordEmail, { loading }] =
    useMutation(SEND_RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const { data } = await sendResetPasswordEmail({
        variables: { email },
      });

      if (!data) {
        throw Error("something is wrong");
      }

      toast.success("Check your email");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Base>
      <ForgotContainer>
        <h1> Forgot Password </h1>
        <p>
          {" "}
          Enter your email address to request a password reset for your account.{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" name="email" />
          <button type="submit" disabled={loading}>
            Confirm
          </button>
        </form>
      </ForgotContainer>
    </Base>
  );
};

const Base = styled.div`
  background-color: #1e9c63;
  height: 100vh;
  display: flex;
`;

const ForgotContainer = styled.div`
  background-color: #36393f;
  width: 30%;
  height: 300px;
  padding: 2em;
  margin: auto;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  h1 {
    text-align: center;
    color: white;
    letter-spacing: 1.5px;
  }
  p {
    color: #c4c4c4;
    font-size: 15px;
    text-align: center;
  }
  input {
    height: 45px;
    width: 100%;
    font-size: 18px;
    padding: 1em;
    margin-top: 5px;
    border-radius: 5px;
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

export default ForgotPassword;
