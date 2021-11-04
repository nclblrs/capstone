import { gql } from "@apollo/client";

export const USERS = gql`
  query users($filter: UsersFilter) {
    users(pagination: { page: 1, limit: 200 }, filter: $filter) {
      data {
        id
        firstName
        middleName
        lastName
        isAdmin
        schoolIdNumber
        profilePicture
        student {
          id
        }
        teacher {
          id
        }
        emails {
          address
        }
      }
    }
  }
`;

export const USERS_COUNT = gql`
  query {
    usersCount {
      usersCount
      teachersCount
      studentsCount
    }
  }
`;

export const ADMIN_CREATE_USER = gql`
  mutation adminCreateUser(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $schoolIdNumber: String!
    $email: String!
    $isTeacher: Boolean!
  ) {
    adminCreateUser(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      schoolIdNumber: $schoolIdNumber
      email: $email
      isTeacher: $isTeacher
    ) {
      id
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdmin(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: String!
  ) {
    createAdmin(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
    ) {
      id
    }
  }
`;
