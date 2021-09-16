import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(
      serviceName: "password"
      params: { user: { email: $email }, password: $password }
    ) {
      sessionId
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
