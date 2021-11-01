import React from "react";
import { GET_TAGS } from "../gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TagsInfo = () => {
  const { groupId } = useParams();
  const { loading: tagLoading, data: tagData } = useQuery(GET_TAGS, {
    variables: { groupId: groupId },
  });
  const tags = tagData?.groupPostTags ?? [];
  return (
    <>
      {tagLoading
        ? "Loading..."
        : tags.map(({ id, name: tagName, count }) => (
            <TagLink key={id} to={`/group/${id}?tag=${tagName}`}>
              #{tagName} <span>{count} posts</span>
            </TagLink>
          ))}
    </>
  );
};

const TagLink = styled(Link)`
  margin: 10px 0px;
  text-decoration: none;
  font-size: 18px;
  color: #0e5937;
  > span {
    font-size: 12px;
    padding: 4px 8px;
    background: #0e5937;
    border: none;
    margin-left: 10px;
    color: white;
    text-align: center;
  }
`;

export default TagsInfo;
