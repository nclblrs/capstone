import { gql } from "@apollo/client";

export const GET_GROUPSUBMISSION = gql`
  query groupSubmission($groupSubmissionId: ID!) {
    groupSubmission(groupSubmissionId: $groupSubmissionId) {
      id
      group {
        id
        name
        leader {
          id
          user {
            firstName
            lastName
          }
        }
        course {
          id
          name
          teacher {
            user {
              firstName
              lastName
            }
          }
        }
        students {
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
      tasks {
        data {
          id
          attachment
          title
          note
          status
          dueAt
          student {
            id
            user {
              firstName
              lastName
            }
          }
        }
      }
      groupActivity {
        id
        title
        description
      }
      myTask {
        id
      }
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query ($courseId: ID!) {
    courseActivities(courseId: $courseId) {
      data {
        id
        title
        dueAt
        createdAt
        course {
          id
        }
        mySubmission {
          id
        }
      }
    }
  }
`;

export const COURSE_ACTIVITIES_SUBMISSIONS = gql`
  query courseActivitiesAndSubmissions($courseId: ID!, $studentId: ID!) {
    courseActivitiesAndSubmissions(courseId: $courseId, studentId: $studentId) {
      data {
        activity {
          id
          title
          createdAt
          dueAt
          course {
            subjCode
            yearAndSection
          }
        }
        submission {
          id
          description
          attachment
          createdAt
          submittedAt
        }
      }
    }
  }
`;
