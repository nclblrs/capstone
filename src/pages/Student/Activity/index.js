import React, { useState } from "react";
import styled from "styled-components";
import Modal from "components/Modal";
import { MdAccountCircle } from "react-icons/md";
import { FaRegCalendarAlt, FaLaptop } from "react-icons/fa";
import { RiQuestionnaireLine } from "react-icons/ri";
import { COURSE_ACTIVITY } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import CreateSubmissionForm from "pages/Student/Activity/Forms/CreateSubmissionForm";

const Activity = () => {
  const [showCreateSubmissionModal, setShowCreateSubmissionModal] =
    useState(false);
  const { activityId } = useParams();
  const { loading, data, refetch } = useQuery(COURSE_ACTIVITY, {
    variables: { activityId: activityId },
  });

  const {
    title,
    description,
    dueAt,
    course,
    attachment = null,
    mySubmission,
    points,
  } = data?.activity ?? {};

  const { teacher, name } = course ?? {};
  const { firstName, lastName } = teacher?.user ?? {};
  const {
    attachment: myAttachment = null,
    description: myDescription,
    createdAt,
    grade,
  } = mySubmission ?? {};
  const { original_filename, secure_url } = JSON.parse(attachment) ?? {};
  const { original_filename: original_filename2, secure_url: secure_url2 } =
    JSON.parse(myAttachment) ?? {};

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
                  {name} &thinsp; | &thinsp; Due:{" "}
                  {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
                <span>{points ? `${points} pts` : "No points assigned"}</span>
              </ActivityContent>
              <ActivityButtons>
                {!mySubmission ? (
                  <button onClick={() => setShowCreateSubmissionModal(true)}>
                    Submit
                  </button>
                ) : (
                  <p> ✓ Submitted!</p>
                )}
              </ActivityButtons>
            </ActivityHeader>

            <ActivityHeader>
              <ActivityContent>
                <h1>My Submission</h1>
                {mySubmission ? (
                  <>
                    <span>
                      Submitted at:{" "}
                      {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                    </span>
                    <span>{myDescription}</span>
                    <span className="activityGrade">
                      {grade ? (
                        <>
                          {grade} / {points}
                        </>
                      ) : (
                        "Not graded yet."
                      )}
                    </span>
                  </>
                ) : (
                  <span>You haven't submitted anything yet.</span>
                )}
                {myAttachment && (
                  <>
                    <p>Attachment:</p>
                    <Attachment href={secure_url2} download>
                      {original_filename2}.{secure_url2.split(".").slice(-1)}
                    </Attachment>
                  </>
                )}
              </ActivityContent>
            </ActivityHeader>
          </LSideContainer>
          <RSideContainer>
            <RSideAbout>
              <h3>ABOUT</h3>
              <ul>
                <li>
                  <FaRegCalendarAlt size={18} />
                  &nbsp; Due Date:{" "}
                  <span>{dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}</span>
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Professor: {firstName} {lastName}
                </li>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Activity Type: <span>By Individual</span>
                </li>
                <li>
                  <RiQuestionnaireLine size={18} />
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
          </RSideContainer>
          <Modal
            show={showCreateSubmissionModal}
            closeModal={() => setShowCreateSubmissionModal(false)}
            title="Create Submission"
          >
            <CreateSubmissionForm
              activityId={activityId}
              onCreateFinish={() => {
                refetch();
                setShowCreateSubmissionModal(false);
              }}
            />
          </Modal>
        </>
      )}
    </ActivityContainer>
  );
};

export default Activity;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 70%;
  flex-direction: column;
`;

const ActivityHeader = styled.div`
  position: relative;
  top: 0px;
  margin: 1em;
  padding: 2em 1em;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
`;

const ActivityContent = styled.div`
  padding: 1em;
  width: 100%;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 26px;
  }
  > span {
    margin-top: 5px;
    color: #646464;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .description {
    margin-top: 25px;
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
  p {
    color: #164aae;
    font-size: 18px;
  }
`;

const RSideContainer = styled.div`
  width: 24%;
  min-width: 400px;
  margin: 0 1em;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
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
    font-size: 17px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
  }
  li {
    padding: 6px 0px;
    > p {
      color: #0e5937;
    }
    > span {
      color: #0e5937;
    }
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
