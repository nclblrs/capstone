import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_STUDLEFTSIDEBAR } from "./gql";
import { useQuery } from "@apollo/client";
import {
  FaPlusCircle,
  FaRegLightbulb,
  FaLaptop,
  FaPenSquare,
} from "react-icons/fa";

const LeftSideBar = () => {
  const { loading, data } = useQuery(GET_STUDLEFTSIDEBAR);
  const courses = data?.studentLeftSidePanel?.courses ?? [];
  const studyGroups = data?.studentLeftSidePanel?.studyGroups ?? [];
  const classGroups = data?.studentLeftSidePanel?.classGroups ?? [];
  return (
    <LSideContainer>
      <LSideItem>
        <h4>
          CLASSES
          <button>
            <FaPlusCircle size={20} class="pluscircle" />
          </button>
        </h4>
        {loading
          ? "Loading..."
          : courses.map(({ id, name }) => (
              <LSideLinks key={id} to={`/class/${id}`}>
                <FaLaptop size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>GROUPS</h4>
        {loading
          ? "Loading..."
          : classGroups.map(({ id, name }) => (
              <LSideLinks key={id} to={`/group/${id}`}>
                <FaRegLightbulb size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>
          STUDY GROUPS
          <button>
            <FaPenSquare size={20} class="pen" />
          </button>
        </h4>
        {loading
          ? "Loading..."
          : studyGroups.map(({ id, name }) => (
              <LSideLinks key={id} to={`/group/${id}`}>
                <FaRegLightbulb size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
    </LSideContainer>
  );
};

const LSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
<<<<<<< HEAD
  width: 20%;
=======
  width: 370px;
  min-width: 370px;
>>>>>>> f80721397a0f2f7fa95f47dc8c63f828872517fb
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
  .pluscircle {
    color: #0e5937;
  }
  .pen {
    color: #0e5937;
  }
`;

const LSideItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
    font-weight: normal;
    button {
      justify-content: flex-end;
      margin-left: auto;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      img {
        width: 18px;
      }
    }
  }
`;

const LSideLinks = styled(Link)`
<<<<<<< HEAD
  color: #003249;
  font-size: 18px;
=======
  color: #0f482f;
>>>>>>> f80721397a0f2f7fa95f47dc8c63f828872517fb
  text-align: center;
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 10px 15px;
  text-decoration: none;
  img {
    width: 20px;
  }
  p {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;

const Line = styled.hr`
  display: flex;
<<<<<<< HEAD
  margin: 0 2em;
=======
  margin: 20px 0;
  color: #e8e8e8;
>>>>>>> f80721397a0f2f7fa95f47dc8c63f828872517fb
`;
export default LeftSideBar;
