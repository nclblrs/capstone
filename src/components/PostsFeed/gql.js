import { gql } from "@apollo/client";

export const POST_COMMENTS = gql`
  query postComments($postId: ID!) {
    postComments(postId: $postId) {
      data {
        id
        createdAt
        content
        score
        vote
        user {
          id
          profilePicture
          firstName
          lastName
        }
      }
    }
  }
`;

export const CREATE_POST_COMMENT = gql`
  mutation createPostComment($postId: ID!, $content: String!) {
    createPostComment(postId: $postId, content: $content) {
      id
    }
  }
`;

export const VOTE_COMMENT = gql`
  mutation voteComment($commentId: ID!, $vote: Int!) {
    voteComment(commentId: $commentId, vote: $vote) {
      id
      vote
      score
    }
  }
`;
