import React, { useState } from "react";
import styled from "styled-components";
import Modal from "components/Modal";
import { FaLaptop } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { COURSE_ACTIVITY } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import CreateSubmissionForm from "pages/Student/Activity/Forms/CreateSubmissionForm";

const Activity = () => {
  const [showCreateSubmissionModal, setShowCreateSubmissionModal] =
    useState(false);
  const { id } = useParams();
  const { loading, data, refetch } = useQuery(COURSE_ACTIVITY, {
    variables: { activityId: id },
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
                  {name} || Due:{" "}
                  {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
                <span>{points} pts</span>
              </ActivityContent>
              <ActivityButtons>
                {!mySubmission ? (
                  <button onClick={() => setShowCreateSubmissionModal(true)}>
                    Submit
                  </button>
                ) : (
                  "Submitted!"
                )}
              </ActivityButtons>
            </ActivityHeader>
            {mySubmission && (
              <ActivityHeader>
                <ActivityContent>
                  <h1>My Submission</h1>
                  <span>
                    Submitted at:{" "}
                    {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                  </span>
                  <span>{myDescription}</span>
                  {myAttachment && (
                    <>
                      Attachment:
                      <Attachment href={secure_url2} download>
                        {original_filename2}.{secure_url2.split(".").slice(-1)}
                      </Attachment>
                    </>
                  )}
                </ActivityContent>
              </ActivityHeader>
            )}
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
                  &nbsp; Activity Type:{" "}
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
          </RSideContainer>
          <Modal
            show={showCreateSubmissionModal}
            closeModal={() => setShowCreateSubmissionModal(false)}
            title="Create Submission"
          >
            <CreateSubmissionForm
              activityId={id}
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
  padding: 2em 0;
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

const RSideContainer = styled.div`
  width: 30%;
  margin: 0 1em;
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
