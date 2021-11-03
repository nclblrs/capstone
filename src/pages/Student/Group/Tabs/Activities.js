import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { GET_GROUP_ACTIVITIES } from "../gql";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Activities = ({ courseId }) => {
  const { loading: groupActivityLoading, data: groupActivityData } = useQuery(
    GET_GROUP_ACTIVITIES,
    {
      variables: { courseId },
    }
  );

  const groupActivityInfo = groupActivityData?.courseGroupActivities.data ?? [];

  return (
    <ActivityContainer>
      {groupActivityLoading
        ? "Loading..."
        : groupActivityInfo.map(({ id, title, dueAt, createdAt, course }) => {
            return (
              <>
                <Activity key={id}>
                  <Content>
                    <h1>{title} </h1>
                    <h4>
                      {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                    </h4>
                    <h3> Due: {dayjs(dueAt).format("MMMM D, YYYY")} </h3>
                  </Content>

                  <ViewLink to={`/class/${course.id}/groupactivity/${id}`}>
                    View
                  </ViewLink>
                </Activity>
              </>
            );
          })}
    </ActivityContainer>
  );
};

const ActivityContainer = styled.div`
  width: 100%;
  padding: 0 2em;
`;

const Activity = styled.div`
  width: 100%;
  border-left: 5px solid #0f482f;
  height: 110px;
  padding: 0 20px;
  text-align: left;
  margin: 1em 1.4em;
  display: flex;
  button {
    margin-left: auto;
    font-size: 16px;
    width: 130px;
    height: 40px;
    border: none;
    color: white;
    background-color: #0f482f;
    cursor: pointer;
    &:hover {
      background-color: #0e5937;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  text-decoration: none;
  margin-top: 7px;

  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #0f482f;
  }
  h4 {
    font-weight: normal;
    margin-top: 5px;
    color: #646464;
  }
  h3 {
    font-weight: normal;
    margin-top: 0;
    color: #0f482f;
    font-size: 18px;
  }
`;

const ViewLink = styled(Link)`
  text-decoration: none;
  margin-left: auto;
  font-size: 16px;
  width: 130px;
  height: 40px;
  border: none;
  color: white;
  background-color: #0f482f;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0e5937;
  }
`;

export default Activities;
