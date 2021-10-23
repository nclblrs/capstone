import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useEffect } from "react";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_API_URL,
});

const linkErrorHandle = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (
        message === "you must be logged in" &&
        !(
          window.location.href.includes("logout") ||
          window.location.href.includes("reset-password") ||
          window.location.href.includes("forgot-password")
        )
      ) {
        window.location.href = "/logout";
      }
      window.console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) window.console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("access-token");

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: linkErrorHandle.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

const Client = ({ children }) => {
  useEffect(() => {
    if (
      !localStorage.getItem("access-token") &&
      !(
        window.location.href.includes("login") ||
        window.location.href.includes("reset-password") ||
        window.location.href.includes("forgot-password")
      )
    )
      window.location.href = "/login ";
  });

  return (
    <ApolloProvider client={client}>
      <CurrentUserContextProvider>{children}</CurrentUserContextProvider>
    </ApolloProvider>
  );
};

export default Client;
