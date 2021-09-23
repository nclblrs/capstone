import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!, $code: String) {
    authenticate(
      serviceName: "password"
      params: { user: { email: $email }, password: $password, code: $code }
    ) {
      sessionId
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;
