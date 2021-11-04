import React, { useState } from "react";
import styled from "styled-components";
import { GET_SUBMISSION, COURSE_ACTIVITYSUBMISSIONS } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Modal from "components/Modal";
import GradeSubmissionForm from "./Forms/GradeSubmissionForm";
import { smallProfpicUrl } from "utils/upload";

const Submission = () => {
  const [showGradeSubmissionModal, setShowGradeSubmissionModal] =
    useState(false);

  const location = useLocation();
  const removeLast = (path) => path.substring(0, path.lastIndexOf("/"));

  const { submissionId, activityId, classId } = useParams();
  const { loading: submissionLoading, data: submissionData } = useQuery(
    GET_SUBMISSION,
    {
      variables: { submissionId: submissionId },
    }
  );

  const {
    description,
    createdAt,
    grade,
    student,
    activity,
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
                <span>
                  {activity.points
                    ? `${activity.points} pts`
                    : "No points assigned"}
                </span>
              </ActivityContent>
              <ActivityButtons>
                {activity.points ? (
                  !grade ? (
                    <button onClick={() => setShowGradeSubmissionModal(true)}>
                      Add Grade
                    </button>
                  ) : (
                    `${grade}/${activity.points}`
                  )
                ) : (
                  ""
                )}
              </ActivityButtons>
            </ActivityHeader>
            <ActivityHeader>
              <ActivityContent>
                <h1>Description</h1>
                <span>{description}</span>
                {attachment && (
                  <>
                    <p>Attachment: </p>
                    <Attachment href={secure_url} download>
                      {original_filename}.{secure_url.split(".").slice(-1)}
                    </Attachment>
                  </>
                )}
              </ActivityContent>
            </ActivityHeader>
          </LSideContainer>
          <RSideContainer>
            <RSideContent>
              <div className="submissionsheader">Other Submissions: </div>
              {activitySubmissionsLoading
                ? "Loading..."
                : activitySubmissions
                    .filter(({ id }) => submissionId !== id)
                    .map(({ id, student }) => {
                      const {
                        firstName,
                        lastName,
                        profilePicture = null,
                      } = student?.user ?? {};
                      const { secure_url: secure_url2 } =
                        JSON.parse(profilePicture) ?? {};
                      return (
                        <Container key={id}>
                          <Content
                            to={`${removeLast(location.pathname)}/${id}`}
                          >
                            <img src={smallProfpicUrl(secure_url2)} alt="a" />
                            <h1>
                              {firstName} {lastName}
                            </h1>
                          </Content>
                        </Container>
                      );
                    })}
            </RSideContent>
            <GoBack to={`/class/${classId}/activity/${activityId}`}>
              Go back to Activity Page
            </GoBack>
          </RSideContainer>
          <Modal
            show={showGradeSubmissionModal}
            closeModal={() => setShowGradeSubmissionModal(false)}
            title="Create Submission"
          >
            <GradeSubmissionForm
              submissionId={submissionId}
              onCreateFinish={() => {
                setShowGradeSubmissionModal(false);
              }}
            />
          </Modal>
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
  width: 95%;
  margin: 1em;
  padding: 1em;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 26px;
  }
  > span {
    margin: 0;
    color: #646464;
    font-size: 18px;
    display: flex;
    margin-top: 5px;
    align-items: center;
  }

  .activityGrade {
    background-color: #0e5937;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    right: 35px;
    color: white;
  }
`;

const RSideContainer = styled.div`
  width: 35%;
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const RSideContent = styled.div`
  border-radius: 10px;
  margin: 1em 0;
  background-color: #f2f2f2;
  width: 100%;
  padding: 0 2em;
  padding-bottom: 1em;
  max-height: 500px;
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

const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  right: 30px;
  top: 50px;
  > button {
    font-size: 15px;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    outline: none;
    height: 32px;
    width: 120px;
  }
`;
