import React, { useState } from "react";
import styled from "styled-components";
import Modal from "components/Modal";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { COURSE_GROUPACTIVITY } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import AssignTaskForm from "pages/Student/GroupActivity/Forms/AssignTaskForm";
import { Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";

const TGroupActivityPage = () => {
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const { activityId } = useParams();
  const { loading, data, refetch } = useQuery(COURSE_GROUPACTIVITY, {
    variables: { groupActivityId: activityId },
  });

  const {
    title,
    description,
    dueAt,
    course,
    attachment = null,
    points,
  } = data?.groupActivity ?? {};

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
                  {name} {"▏"} Due:{" "}
                  {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                </span>
                <span>{points ? `${points} pts` : "No points assigned"}</span>
              </ActivityContent>
              <ActivityButtons></ActivityButtons>
            </ActivityHeader>

            <ActivityHeader>
              <ActivityContent>
                <h1>Group Submissions</h1>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
                <Container>
                  <Content>
                    <h1>
                      TEST <span> | Date here</span>
                    </h1>
                  </Content>
                </Container>
              </ActivityContent>
            </ActivityHeader>
          </LSideContainer>
          <RSideContainer>
            <RSideAbout>
              <h3>ABOUT</h3>
              <ul>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Due Date:{" "}
                  <span>{dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}</span>
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Professor: {firstName} {lastName}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Activity Type: <span>By Group</span>
                </li>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Subject: <span>{name}</span>
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
            show={showAssignTaskModal}
            closeModal={() => setShowAssignTaskModal(false)}
            title="Assign Task"
          >
            <AssignTaskForm
              onCreateFinish={() => {
                refetch();
                setShowAssignTaskModal(false);
              }}
            />
          </Modal>
        </>
      )}
    </ActivityContainer>
  );
};

export default TGroupActivityPage;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
  margin-left: 260px;
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
`;

const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  right: 30px;
  top: 37px;
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
  width: 20%;
  min-width: 350px;
  margin: 0 10px;
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
    font-size: 18px;
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
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  text-align: left;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-left: 5px solid #0f482f;
  padding: 0 20px;
  text-align: left;
  margin: 1em 1.4em;
  display: flex;
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
    > span {
      font-size: 16px;
      margin: 0;
      padding: 0;
      display: flex;
    }
  }
  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
