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
<<<<<<< HEAD
  margin: 2em;
=======
  margin: 0 50px;
>>>>>>> f80721397a0f2f7fa95f47dc8c63f828872517fb
`;
export default Home;
