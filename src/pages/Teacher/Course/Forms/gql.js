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

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $title: String!
    $description: String!
    $dueAt: Date!
    $courseId: ID!
    $points: Int
  ) {
    createActivity(
      title: $title
      description: $description
      dueAt: $dueAt
      courseId: $courseId
      points: $points
    ) {
      id
    }
  }
`;

export const ACTIVITY_ATTACHMENT = gql`
  mutation addAttachmentToActivity($id: ID!, $attachment: String!) {
    addAttachmentToActivity(id: $id, attachment: $attachment) {
      id
    }
  }
`;

export const CREATE_GROUP_ACTIVITY = gql`
  mutation createGroupActivity(
    $title: String!
    $description: String!
    $dueAt: Date!
    $courseId: ID!
    $points: Int
  ) {
    createGroupActivity(
      title: $title
      description: $description
      dueAt: $dueAt
      courseId: $courseId
      points: $points
    ) {
      id
    }
  }
`;

export const GROUP_ACTIVITY_ATTACHMENT = gql`
  mutation addAttachmentToGroupActivity($id: ID!, $attachment: String!) {
    addAttachmentToGroupActivity(id: $id, attachment: $attachment) {
      id
    }
  }
`;
