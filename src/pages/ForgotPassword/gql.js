import { gql } from "@apollo/client";

export const SEND_RESET_PASSWORD = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;
