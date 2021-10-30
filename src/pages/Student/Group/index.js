import React from "react";
import { GET_GROUP } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import StudyGroup from "./StudyGroup";
import ClassGroup from "./ClassGroup";

const Group = () => {
  const { groupId } = useParams();
  const { data } = useQuery(GET_GROUP, {
    variables: { groupId: groupId },
  });
  const { type } = data?.group ?? {};
  if (type === "STUDY") {
    return <StudyGroup />;
  }
  if (type === "CLASS") {
    return <ClassGroup />;
  } else return null;
};

export default Group;
