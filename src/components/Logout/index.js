import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { LOGOUT } from "./gql";
import styled from "styled-components";

const Logout = () => {
  const [logout] = useMutation(LOGOUT);

  useEffect(() => {
    (async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }
      localStorage.removeItem("access-token");
      window.location.href = "/";
    })();
  }, [logout]);

  return (
    <Base>
      <h1>Logging out...</h1>
    </Base>
  );
};

const Base = styled.div`
  background-color: #1e9c63;
  height: 100vh;
  display: flex;
  h1 {
    color: white;
    font-size: 20px;
    font-weight: normal;
    margin-left: 1em;
  }
`;

export default Logout;
