import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation createCourse(
    $name: String!
    $subjCode: String!
    $yearAndSection: String!
    $startsAt: Date!
    $endsAt: Date!
  ) {
    createCourse(
      name: $name
      subjCode: $subjCode
      yearAndSection: $yearAndSection
      startsAt: $startsAt
      endsAt: $endsAt
    ) {
      id
    }
  }
`;

export const STUDENTS_WITHOUT_GROUP = gql`
  query ($courseId: ID!) {
    studentsWithoutGroup(courseId: $courseId) {
      data {
        id
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const CREATE_CLASS_GROUP = gql`
  mutation createClassGroup($courseId: ID!, $studentIds: [ID!]!) {
    createClassGroup(courseId: $courseId, studentIds: $studentIds) {
      id
    }
  }
`;
