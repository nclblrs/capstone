import React from "react";
import styled from "styled-components";

const Files = () => {
  return (
    <FileContainer>
      <h1 title="">testfile.jpg</h1>
      <span>Uploaded by: Nicole Baleros</span>
      <p className="date">Mon, Aug 30, 2021 at 12:00 PM</p>
    </FileContainer>
  );
};

const FileContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #0f482f;
  border-left: 1px solid #0f482f;
  border-radius: 10px;
  height: 100px;
  padding: 10px;
  margin: 10px 0;
  text-align: left;
  > h1 {
    margin: 0;
    padding: 0;
    font-size: 22px;
  }
  > span {
    font-size: 18px;
  }
  .date {
    margin: 0;
    font-size: 18px;
  }
`;

export default Files;
