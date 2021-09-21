import React from "react";
import { GET_GROUP } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const Group = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_GROUP, {
    variables: { groupId: id },
  });
  const { name } = data?.group ?? {};
  return <div>{loading ? "Loading..." : `${name}`}</div>;
};

export default Group;
