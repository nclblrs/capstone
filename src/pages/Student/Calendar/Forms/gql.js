import { gql } from "@apollo/client";

export const CREATE_AGENDA = gql`
  mutation createAgenda(
    $title: String!
    $endsAt: Date!
    $description: String!
  ) {
    createAgenda(title: $title, endsAt: $endsAt, description: $description) {
      id
    }
  }
`;

export const AGENDA_ATTACHMENT = gql`
  mutation addAttachmentToAgenda($id: ID!, $attachment: String!) {
    addAttachmentToAgenda(id: $id, attachment: $attachment) {
      id
    }
  }
`;
