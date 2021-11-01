import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { RESET_PASSWORD } from "./gql";

const ResetPassword = () => {
  const { token } = useParams();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      const { data } = await resetPassword({
        variables: { token, newPassword },
      });

      if (!data) {
        throw Error("something is wrong");
      }

      toast.success("successfully changed password");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Base>
      <ResetContainer>
        <h1> Reset Password </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
          />
          <button type="submit" disabled={loading}>
            Reset Password
          </button>
        </form>
      </ResetContainer>
    </Base>
  );
};

const Base = styled.div`
  background-color: #1e9c63;
  height: 100vh;
  display: flex;
`;

const ResetContainer = styled.div`
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
  }
`;

export default ResetPassword;
