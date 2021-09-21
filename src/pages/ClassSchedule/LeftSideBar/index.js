import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apple from "pages/ClassSchedule/LeftSideBar/images/apple.svg";
import plus from "pages/ClassSchedule/LeftSideBar/images/plus.svg";
import { GET_STUDLEFTSIDEBAR } from "./gql";
import { useQuery } from "@apollo/client";

const LeftSideBar = () => {
    const { loading, data } = useQuery(GET_STUDLEFTSIDEBAR);
    const courses = data?.studentLeftSidePanel?.courses ?? [];
    return (
        <LSideContainer>
          <LSideItem>
            <h4>
              CLASSES
              <button>
                <img src={plus} alt="" />
              </button>
            </h4>
            {loading
              ? "Loading..."
              : courses.map(({ name }) => (
                  <LSideLinks>
                    <img src={apple} alt="" />
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
      width: 20%;
      border-radius: 10px;
      flex-direction: column;
      height: max-content;
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
      color: #003249;
      font-size: 18px;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }
    `;
    
    export default LeftSideBar;