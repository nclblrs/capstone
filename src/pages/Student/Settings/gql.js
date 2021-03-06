import { gql } from "@apollo/client";

export const CHANGE_PROFILEPIC = gql`
  mutation changeProfilePicture($profilePicture: String!) {
    changeProfilePicture(profilePicture: $profilePicture) {
      id
      profilePicture
    }
  }
`;

export const EDITUSERINFO = gql`
  mutation editUserInfo(
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $email: String
  ) {
    editUserInfo(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      middleName
      lastName
      emails {
        address
      }
    }
  }
`;
