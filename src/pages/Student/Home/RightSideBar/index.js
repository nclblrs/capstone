import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { GET_AGENDARIGHTSIDEBAR } from "./gql";
import { FaRegLightbulb } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import dayjs from "dayjs";

const RightSideBar = () => {
  const { groupSubmissionId } = useParams();
  const { loading, data } = useQuery(GET_AGENDARIGHTSIDEBAR);
  const activities = data?.agendaRightSidePanel?.activities ?? [];
  const groupActivities = data?.agendaRightSidePanel?.groupActivities ?? [];
  const tasks = data?.agendaRightSidePanel?.tasks ?? [];
  const { course } = tasks ?? {};
  var today = new Date(),
    date = dayjs(today).format("MMMM D, YYYY");
  console.log(date);
  return (
    <RSideContainer>
      <RSideItem>
        <h4>REMINDER</h4>
        <p>
          Today's Agenda
          <br />
          Current Date : {date}
        </p>

        <h5>INDIVIDUAL ACTIVITY</h5>
        {loading
          ? "Loading..."
          : activities.map(({ id, title, dueAt }) => (
              <RSideLinks key={id} to={`/class/${id}/activity/${id}`}>
                <FaRegLightbulb size={20} />
                <span>
                  <p title={title}>{title}</p>
                  <p className="deadline">
                    {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                  </p>
                </span>
              </RSideLinks>
            ))}
      </RSideItem>
      {activities?.length === 2 && (
        <RSideLinks to="/calendar">
          <BiDotsHorizontalRounded size={20} /> See More
        </RSideLinks>
      )}
      <Line />
      <h5>GROUP ACTIVITY</h5>
      <RSideItem>
        {loading
          ? "Loading..."
          : groupActivities.map(({ id, title, dueAt }) => (
              <RSideLinks key={id} to={`/class/${id}/groupactivity/${id}`}>
                <FaRegLightbulb size={20} />
                <span>
                  <p title={title}>{title}</p>
                  <p className="deadline">
                    {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                  </p>
                </span>
              </RSideLinks>
            ))}
      </RSideItem>
      {groupActivities?.length === 2 && (
        <RSideLinks to="/calendar">
          <BiDotsHorizontalRounded size={20} /> See More
        </RSideLinks>
      )}
      <Line />
      <h5>TASK</h5>
      <RSideItem>
        {loading
          ? "Loading..."
          : tasks.map(({ id, title, dueAt }) => (
              <RSideLinks
                key={id}
                to={`/progress/class/${course?.id}/groupactivity/${groupSubmissionId}/task/${id}`}
              >
                <FaRegLightbulb size={20} />
                <span>
                  <p title={title}>{title}</p>
                  <p className="deadline">
                    {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                  </p>
                </span>
              </RSideLinks>
            ))}
      </RSideItem>
      {tasks?.length === 2 && (
        <RSideLinks to="/calendar">
          <BiDotsHorizontalRounded size={20} /> See More
        </RSideLinks>
      )}
    </RSideContainer>
  );
};

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  background-color: #f2f2f2;
  width: 300px;
  min-width: 300px;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
  padding: 29px;
  h5 {
    color: #646464;
    font-weight: normal;
    font-size: 16px;
    margin: 0;
    margin-bottom: 10px;
  }
`;

const RSideItem = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    margin: 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-weight: normal;
    img {
      margin-left: 10px;
      width: 16px;
    }
  }
  p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const RSideLinks = styled(Link)`
  color: #0f482f;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  img {
    width: 20px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 18px;
  }
  .deadline {
    font-size: 14px;
    color: #646464;
  }
`;

const Line = styled.hr`
  display: flex;
  margin: 15px 0;
  color: #e8e8e8;
`;

export default RightSideBar;
