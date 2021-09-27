import React from "react";
import styled from "styled-components";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";

const Home = () => {
  return (
    <HomeContainer>
      <LeftSideBar />
      <Feed />
      <RightSideBar />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em;
  margin: 0 50px;
  margin: 0 50px; ;
`;

export default Home;
