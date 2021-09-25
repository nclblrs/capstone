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
  top: 100px;
  background-color: #f2f2f2;
  width: 290px;
  min-width: 290px;
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
  h4 {
    color: #646464;
    text-align: left;
    font-size: 18px;
    display: flex;
    margin: 0;
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
        width: 12px;
      }
    }
  }
`;

const LSideLinks = styled(Link)`
  color: #003249;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 12px;
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
  }
`;

const Line = styled.hr`
  display: flex;
  margin: 20px 0;
`;
export default LeftSideBar;
