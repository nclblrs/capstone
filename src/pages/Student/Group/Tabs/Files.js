import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { STUDYGROUP_FILES } from "../gql";
import { useQuery } from "@apollo/client";
import { formatBytes } from "utils/upload";
import { useParams } from "react-router-dom";

const Files = () => {
  const { groupId } = useParams();
  const { loading, data } = useQuery(STUDYGROUP_FILES, {
    variables: { groupId: groupId },
  });
  const postFiles = data?.studyGroupFiles?.postFiles ?? [];
  return (
    <FileContainer>
      {loading
        ? "Loading..."
        : postFiles.map(({ attachment, user }) => {
            const { original_filename, secure_url, created_at, bytes } =
              JSON.parse(attachment) ?? {};

            return (
              <>
                {attachment && (
                  <File>
                    <Attachment href={secure_url} download>
                      <h1 title="">
                        {original_filename}.{secure_url.split(".").slice(-1)}
                      </h1>
                    </Attachment>
                    <span>{formatBytes(bytes)}</span>
                    <span>
                      Uploaded by: {user.firstName} {user.lastName}
                    </span>
                    <p className="date">
                      {dayjs(created_at).format("MMMM D, YYYY [at] h:mm a")}
                    </p>
                  </File>
                )}
              </>
            );
          })}
    </FileContainer>
  );
};

const FileContainer = styled.div`
  width: 100%;
`;

const File = styled.div`
  width: 100%;
  border-left: 5px solid #0f482f;
  height: 110px;
  padding: 10px 20px;
  text-align: left;
  margin-top: 1em;
  cursor: pointer;
  .date {
    margin: 0;
    font-size: 18px;
    color: #646464;
  }
  > span {
    font-size: 18px;
    display: block;
    color: #646464;
  }
`;

const Attachment = styled.a`
  color: #0e5937;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  > h1 {
    margin: 0;
    padding: 0;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default Files;
