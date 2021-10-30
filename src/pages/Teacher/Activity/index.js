import React from "react";
import styled from "styled-components";
import { FaLaptop } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { COURSE_ACTIVITY, COURSE_ACTIVITYSUBMISSIONS } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const TActivity = () => {
  const location = useLocation();
  const { activityId, classId } = useParams();
  const { loading, data: courseActivityData } = useQuery(COURSE_ACTIVITY, {
    variables: { activityId: activityId },
  });

  const { loading: activitySubmissionsLoading, data: activitySubmissionsData } =
    useQuery(COURSE_ACTIVITYSUBMISSIONS, {
      variables: { activityId: activityId },
    });

  const {
    title,
    description,
    dueAt,
    course,
    attachment = null,
  } = courseActivityData?.activity ?? {};

  const activitySubmissions =
    activitySubmissionsData?.activitySubmissions?.data ?? [];

  const { teacher, name } = course ?? {};
  const { firstName, lastName } = teacher?.user ?? {};

  const { original_filename, secure_url } = JSON.parse(attachment) ?? {};

  return (
    <ActivityContainer>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <LSideContainer>
            <ActivityHeader>
              <ActivityContent>
                <h1>{title}</h1>
                <span>
                  {name} || Due:{" "}
                  {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
              </ActivityContent>
            </ActivityHeader>
            <ActivityHeader>
              <h1 className="submissions">Submissions </h1>
              {activitySubmissionsLoading
                ? "Loading..."
                : activitySubmissions.map(({ id, student, createdAt }) => {
                    return (
                      <>
                        <Submission key={id}>
                          <Content>
                            <h1>
                              {student.user.firstName} {student.user.lastName}
                            </h1>
                            <span>
                              Submitted:{" "}
                              {dayjs(createdAt).format(
                                "MMMM D, YYYY [at] h:mm a"
                              )}
                            </span>
                          </Content>
                          <Link
                            className="buttons"
                            to={`${location.pathname}/submission/${id}`}
                          >
                            View
                          </Link>
                        </Submission>
                      </>
                    );
                  })}
            </ActivityHeader>
          </LSideContainer>
          <RSideContainer>
            <RSideAbout>
              <h3>ABOUT</h3>
              <ul>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Due Date:{" "}
                  {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Professor: {firstName} {lastName}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Activity Type: Individual Activity
                </li>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Subject: {name}
                </li>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Description: <p>{description}</p>
                </li>
                <li>
                  {attachment && (
                    <>
                      Attachment:
                      <Attachment href={secure_url} download>
                        {original_filename}.{secure_url.split(".").slice(-1)}
                      </Attachment>
                    </>
                  )}
                </li>
              </ul>
            </RSideAbout>
            <GoBack to={`/class/${classId}/activities`}>
              Go to Activities Tab
            </GoBack>
          </RSideContainer>
        </>
      )}
    </ActivityContainer>
  );
};

export default TActivity;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
  margin-left: 270px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 65%;
  flex-direction: column;
`;

const ActivityHeader = styled.div`
  position: sticky;
  top: 0px;
  margin: 1em;
  padding: 2em 0;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
  .submissions {
    padding: 1em;
    font-size: 22px;
    margin: 0;
    padding: 0 10px;
    font-weight: 400;
    color: #0f482f;
  }
`;

const ActivityContent = styled.div`
  width: 60%;
  margin: 1em;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 22px;
  }
  > span {
    margin: 0;
    color: #646464;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
`;

const RSideContainer = styled.div`
  width: 35%;
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 18px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const RSideAbout = styled.div`
  border-radius: 10px;
  margin: 1em 0;
  background-color: #f2f2f2;
  width: 100%;
  padding: 2em;
  ul {
    padding: 0 1em;
    font-size: 18px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
  }
  li {
    padding: 6px 0px;
  }
`;

const Attachment = styled.a`
  background: #0e5937;
  color: white;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 1em;
`;

const Submission = styled.div`
  width: 100%;
  border-left: 5px solid #0f482f;
  height: 65px;
  padding: 0 20px;
  text-align: left;
  display: flex;
  justify-content: center;
  margin: 1em 1.4em;

  .buttons {
    position: absolute;
    right: 30px;
    font-size: 16px;
    width: 110px;
    height: 50px;
    border: none;
    color: white;
    background-color: #0f482f;
    cursor: pointer;
    justify-content: center;
    display: flex;
    align-items: center;
    text-decoration: none;
    &:hover {
      background-color: #0e5937;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  text-decoration: none;
  margin-top: 7px;

  > h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #0f482f;
  }
  > span {
    color: #646464;
  }
`;

const GoBack = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  width: 200px;
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
