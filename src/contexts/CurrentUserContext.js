import { createContext, useContext } from "react";
import { useQuery, gql } from "@apollo/client";

const CurrentUserContext = createContext();

const GET_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      firstName
      middleName
      lastName
      isAdmin
      student {
        id
      }
      teacher {
        id
      }
      uploadPreset
      emails {
        address
      }
    }
  }
`;

export const CurrentUserContextProvider = ({ children }) => {
  const accessToken = localStorage.getItem("access-token");
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    skip: !accessToken,
  });
  const user = data?.getCurrentUser;

  console.log(error);
  return (
    <CurrentUserContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
