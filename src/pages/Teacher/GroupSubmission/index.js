import React, { useState } from "react";
import styled from "styled-components";
import { GET_GROUPSUBMISSION, COURSE_GROUPACTIVITYSUBMISSIONS } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Modal from "components/Modal";
import GradeGroupSubmissionForm from "./Forms/GradeGroupSubmissionForm";

const GroupSubmission = () => {
  const [showGradeGroupSubmissionModal, setShowGradeGroupSubmissionModal] =
    useState(false);

  const location = useLocation();
  const removeLast = (path) => path.substring(0, path.lastIndexOf("/"));

  const { groupSubmissionId, groupActivityId } = useParams();
  const { loading: groupSubmissionLoading, data: groupSubmissionData } =
    useQuery(GET_GROUPSUBMISSION, {
      variables: { groupSubmissionId: groupSubmissionId },
    });

  const {
    description,
    createdAt,
    submittedAt,
    grade,
    group,
    groupActivity,
    attachment = null,
  } = groupSubmissionData?.groupSubmission ?? {};

  const {
    loading: groupActivitySubmissionsLoading,
    data: groupActivitySubmissionsData,
  } = useQuery(COURSE_GROUPACTIVITYSUBMISSIONS, {
    variables: { groupActivityId: groupActivityId },
  });

  const groupActivitySubmissions =
    groupActivitySubmissionsData?.groupActivitySubmissions?.data ?? [];

  const { original_filename, secure_url } = JSON.parse(attachment) ?? {};

  return (
    <ActivityContainer>
      {groupSubmissionLoading ? (
        "Loading..."
      ) : (
        <>
          <LSideContainer>
            <ActivityHeader>
              <ActivityContent>
                <h1>{group.name}'s Submission</h1>
                <span>
                  {" "}
                  Deadline:{" "}
                  {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
                <span>
                  {groupActivity.points
                    ? `${groupActivity.points} pts`
                    : "No points assigned"}
                </span>
              </ActivityContent>
              <ActivityButtons>
                {groupActivity.points ? (
                  !grade ? (
                    <button
                      onClick={() => setShowGradeGroupSubmissionModal(true)}
                    >
                      Add Grade
                    </button>
                  ) : (
                    <div className="ptsbg">
                      {grade}/{groupActivity.points}
                    </div>
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
                <span>
                  Submitted at{" "}
                  {dayjs(submittedAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
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
              {groupActivitySubmissionsLoading
                ? "Loading..."
                : groupActivitySubmissions
                    .filter(({ submittedAt }) => submittedAt)
                    .map(({ id, group }) => {
                      return (
                        <Container key={id}>
                          <Content
                            to={`${removeLast(location.pathname)}/${id}`}
                          >
                            <h1>{group.name}</h1>
                          </Content>
                        </Container>
                      );
                    })}
            </RSideContent>
          </RSideContainer>
          <Modal
            show={showGradeGroupSubmissionModal}
            closeModal={() => setShowGradeGroupSubmissionModal(false)}
            title="Create Grade"
          >
            <GradeGroupSubmissionForm
              groupSubmissionId={groupSubmissionId}
              onCreateFinish={() => {
                setShowGradeGroupSubmissionModal(false);
              }}
            />
          </Modal>
        </>
      )}
    </ActivityContainer>
  );
};

export default GroupSubmission;

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
  &:hover {
    background-color: #158f58;
  }
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
  .ptsbg {
    background-color: #0e5937;
    padding: 20px;
    border-radius: 3px;
    color: white;
  }
`;
