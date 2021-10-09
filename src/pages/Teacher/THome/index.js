import React from "react";
import styled from "styled-components";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";

const Home = () => {
  return (
    <HomeContainer>
      <Feed />
      <RightSideBar />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
  position: relative;
`;

export default Home;
