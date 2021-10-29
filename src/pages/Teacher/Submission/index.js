import React from "react";
import styled from "styled-components";
import { GET_SUBMISSION, COURSE_ACTIVITYSUBMISSIONS } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
/* import { useLocation } from "react-router"; */ // to be used for other submissions (right side bar)

const Submission = () => {
  /* const location = useLocation(); */ // to be used for other submissions (right side bar)
  const { submissionId, activityId } = useParams();
  const { loading: submissionLoading, data: submissionData } = useQuery(
    GET_SUBMISSION,
    {
      variables: { submissionId: submissionId },
    }
  );

  const {
    description,
    createdAt,
    /* grade, */ // to be used added
    student,
    /* activity, */ // to be used added
    attachment = null,
  } = submissionData?.submission ?? {};

  const { loading: activitySubmissionsLoading, data: activitySubmissionsData } =
    useQuery(COURSE_ACTIVITYSUBMISSIONS, {
      variables: { activityId: activityId },
    });

  const activitySubmissions =
    activitySubmissionsData?.activitySubmissions?.data ?? [];

  const { firstName, lastName } = student?.user ?? {};

  const { original_filename, secure_url } = JSON.parse(attachment) ?? {};

  return (
    <ActivityContainer>
      {submissionLoading ? (
        "Loading..."
      ) : (
        <>
          <LSideContainer>
            <ActivityHeader>
              <ActivityContent>
                <h1>
                  {firstName} {lastName}'s Submission
                </h1>
                <span>
                  {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
                {attachment && (
                  <>
                    Attachment:
                    <Attachment href={secure_url} download>
                      {original_filename}.{secure_url.split(".").slice(-1)}
                    </Attachment>
                  </>
                )}
              </ActivityContent>
            </ActivityHeader>
            <ActivityHeader>
              <ActivityContent>
                <h1>Description</h1>
                <span>{description}</span>
                {attachment && (
                  <>
                    Attachment:
                    <Attachment href={secure_url} download>
                      {original_filename}.{secure_url.split(".").slice(-1)}
                    </Attachment>
                  </>
                )}
              </ActivityContent>
            </ActivityHeader>
          </LSideContainer>
          <RSideContainer>
            <RSideAbout>
              <div className="submissionsheader">Other Submissions: </div>
              {activitySubmissionsLoading
                ? "Loading..."
                : activitySubmissions.map(({ id, student }) => {
                    return (
                      <>
                        <Container key={id}>
                          <Content>
                            <img
                              src={`https://picsum.photos/seed/${student.user.id}/80/80`}
                              alt="a"
                            />
                            <h1>
                              {student.user.firstName} {student.user.lastName}
                            </h1>
                          </Content>
                        </Container>
                      </>
                    );
                  })}
            </RSideAbout>
          </RSideContainer>
        </>
      )}
    </ActivityContainer>
  );
};

export default Submission;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
  margin-left: 270px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 70%;
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
  width: 30%;
  margin: 0 1em;
  > h3 {
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
  padding: 0 2em;
  padding-bottom: 1em;
  max-height: 400px;
  overflow-y: scroll;
  .submissionsheader {
    border-bottom: 3px solid #0f482f;
    padding: 1.5em 0;
    margin-bottom: 1em;
    position: sticky;
    top: 0px;
    background-color: #f2f2f2;
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

const Container = styled.div`
  width: 100%;
  height: 40px;
  text-align: left;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Content = styled(Link)`
  width: 100%;
  text-decoration: none;
  margin-top: 7px;
  display: flex;

  > h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #0f482f;
    font-weight: 500;
  }
  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
