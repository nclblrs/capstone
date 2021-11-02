import { gql } from "@apollo/client";

export const CHANGE_PROFILEPIC = gql`
  mutation changeProfilePicture($profilePicture: String!) {
    changeProfilePicture(profilePicture: $profilePicture) {
      id
      profilePicture
    }
  }
`;
