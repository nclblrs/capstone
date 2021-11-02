import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query group($groupId: ID!) {
    group(groupId: $groupId) {
      id
      name
      type
      groupCode
      course {
        id
        name
      }
      leader {
        id
        user {
          firstName
          lastName
        }
      }
      admins {
        data {
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
            firstName
            middleName
            lastName
            profilePicture
          }
        }
      }
    }
  }
`;

export const GROUP_POSTS = gql`
  query groupPosts($groupId: ID!, $tags: [String]) {
    groupPosts(groupId: $groupId, tags: $tags) {
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

export const CREATE_GROUP_POST = gql`
  mutation createPost(
    $groupId: ID!
    $content: String!
    $category: String!
    $tags: [String]
  ) {
    createPost(
      groupId: $groupId
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

export const GET_TAGS = gql`
  query groupPostTags($groupId: ID!) {
    groupPostTags(groupId: $groupId) {
      name
      count
    }
  }
`;

export const CREATE_STUDY_GROUP = gql`
  mutation createStudyGroup($name: String!) {
    createStudyGroup(name: $name) {
      id
    }
  }
`;

export const JOIN_STUDY_GROUP = gql`
  mutation joinStudyGroup($groupCode: String!) {
    joinStudyGroup(groupCode: $groupCode) {
      id
    }
  }
`;

export const GROUP_FROM_GROUPCODE = gql`
  query ($groupCode: String!) {
    groupFromGroupCode(groupCode: $groupCode) {
      id
      name
      admins {
        data {
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const STUDYGROUP_FILES = gql`
  query studyGroupFiles($groupId: ID!) {
    studyGroupFiles(groupId: $groupId) {
      postFiles {
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

export const BECOME_LEADER = gql`
  mutation becomeLeader($groupId: ID!) {
    becomeLeader(groupId: $groupId) {
      id
    }
  }
`;

export const TRANSFER_LEADERSHIP = gql`
  mutation transferLeadership($groupId: ID!, $studentId: ID!) {
    transferLeadership(groupId: $groupId, studentId: $studentId) {
      id
    }
  }
`;

export const GET_GROUP_ACTIVITIES = gql`
  query courseGroupActivities($courseId: ID!) {
    courseGroupActivities(courseId: $courseId) {
      data {
        id
        title
        dueAt
        createdAt
      }
    }
  }
`;

export const CLASSGROUP_FILES = gql`
  query classGroupFiles($groupId: ID!) {
    classGroupFiles(groupId: $groupId) {
      postFiles {
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
