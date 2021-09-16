import { useMutation } from "@apollo/client";
import { useEffect } from "react";

import { LOGOUT } from "./gql";

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

  return "Logging out";
};

export default Logout;
