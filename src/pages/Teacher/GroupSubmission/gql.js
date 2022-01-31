import { gql } from "@apollo/client";

export const GET_GROUPSUBMISSION = gql`
  query groupSubmission($groupSubmissionId: ID!) {
    groupSubmission(groupSubmissionId: $groupSubmissionId) {
      id
      description
      createdAt
      grade
      attachment
      groupActivity {
        id
        points
      }
      group {
        name
      }
    }
  }
`;

export const COURSE_GROUPACTIVITYSUBMISSIONS = gql`
  query groupActivitySubmissions($groupActivityId: ID!) {
    groupActivitySubmissions(groupActivityId: $groupActivityId) {
      data {
        id
        groupActivity {
          id
          points
          course {
            id
          }
        }
        group {
          name
        }
      }
    }
  }
`;

export const GRADE_GROUPSUBMISSION = gql`
  mutation gradeGroupSubmission($groupSubmissionId: ID!, $grade: Int!) {
    gradeGroupSubmission(groupSubmissionId: $groupSubmissionId, grade: $grade) {
      id
      grade
    }
  }
`;
