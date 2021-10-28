import { gql } from "@apollo/client";

export const GET_COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
      id
      name
      subjCode
      courseCode
      yearAndSection
      teacher {
        id
        user {
          firstName
          lastName
        }
      }
      students {
        data {
          user {
            firstName
            lastName
          }
        }
      }
      groups {
        data {
          name
          leader {
            user {
              firstName
              lastName
            }
          }
          students {
            data {
              user {
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  }
`;

export const COURSE_POSTS = gql`
  query coursePosts($courseId: ID!) {
    coursePosts(courseId: $courseId) {
      data {
        id
        content
        attachment
        category
        createdAt
        tags
        user {
          id
          profilePicture
          firstName
          lastName
        }
        activity {
          id
          title
          description
          attachment
          dueAt
          course {
            id
          }
        }
        groupActivity {
          id
          title
          description
          attachment
          dueAt
          course {
            id
          }
        }
      }
    }
  }
`;

export const CREATE_COURSE_POST = gql`
  mutation createPost(
    $courseId: ID!
    $content: String!
    $category: String!
    $tags: [String]
  ) {
    createPost(
      courseId: $courseId
      content: $content
      category: $category
      tags: $tags
    ) {
      id
    }
  }
`;

export const ADD_ATTACHMENT_TO_POST = gql`
  mutation addAttachmentToPost($id: ID!, $attachment: String!) {
    addAttachmentToPost(id: $id, attachment: $attachment) {
      id
    }
  }
`;

export const JOIN_COURSE = gql`
  mutation joinCourse($courseCode: String!) {
    joinCourse(courseCode: $courseCode) {
      id
    }
  }
`;

export const COURSE_FROM_COURSECODE = gql`
  query ($courseCode: String!) {
    courseFromCourseCode(courseCode: $courseCode) {
      id
      teacher {
        user {
          firstName
          lastName
        }
      }
      courseCode
      yearAndSection
    }
  }
`;

export const COURSE_FILES = gql`
  query ($courseId: ID!) {
    courseFiles(courseId: $courseId) {
      postFiles {
        attachment
        user {
          firstName
          lastName
        }
      }
      activityFiles {
        attachment
        user {
          firstName
          lastName
        }
      }
      groupActivityFiles {
        attachment
        user {
          firstName
          lastName
        }
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
      }
    }
  }
`;

export const GET_GROUP_ACTIVITIES = gql`
  query ($courseId: ID!) {
    courseGroupActivities(courseId: $courseId) {
      data {
        id
        title
        dueAt
      }
    }
  }
`;
