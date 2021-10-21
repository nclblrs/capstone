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
