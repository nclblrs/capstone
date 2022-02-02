import { gql } from "@apollo/client";

export const USERS = gql`
  query users($filter: UsersFilter) {
    users(pagination: { page: 1, limit: 200 }, filter: $filter) {
      data {
        id
        firstName
        middleName
        lastName
        courseDept
        section
        isAdmin
        schoolIdNumber
        yearLevel
        courseDept
        section
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

export const ADMIN_EDITUSER_INFO = gql`
  mutation adminEditUserInfo(
    $id: ID!
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $courseDept: String!
    $yearLevel: String!
    $section: String!
    $schoolIdNumber: String!
    $email: String!
  ) {
    adminEditUserInfo(
      id: $id
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      courseDept: $courseDept
      yearLevel: $yearLevel
      section: $section
      schoolIdNumber: $schoolIdNumber
      email: $email
    ) {
      id
      firstName
      middleName
      lastName
      courseDept
      yearLevel
      section
      schoolIdNumber
      emails {
        address
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
    $yearLevel: String!
    $courseDept: String!
    $section: String!
    $email: String!
    $isTeacher: Boolean!
  ) {
    adminCreateUser(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      schoolIdNumber: $schoolIdNumber
      yearLevel: $yearLevel
      courseDept: $courseDept
      section: $section
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
