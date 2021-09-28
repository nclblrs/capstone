import React from "react";
import {
  ADD_ATTACHMENT_TO_POST,
  COURSE_POSTS,
  CREATE_COURSE_POST,
  GET_COURSE,
} from "./gql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostsFeed from "components/PostsFeed";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import PostForm from "components/PostForm";

const Course = () => {
  let { id } = useParams();
  const { user } = useCurrentUserContext();

  const [createPost] = useMutation(CREATE_COURSE_POST);
  const [addAttachmentToPost] = useMutation(ADD_ATTACHMENT_TO_POST);

  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: id },
  });
  const {
    data: postsData,
    loading: postsLoading,
    refetch,
  } = useQuery(COURSE_POSTS, {
    variables: { courseId: id },
  });

  const posts = postsData?.coursePosts?.data ?? [];

  const { name, subjCode, teacher, courseCode, yearAndSection } =
    data?.course ?? {};
  const { firstName, lastName } = teacher?.user ?? {};

  const handleCreatePost = async (data) => {
    const { content, category, file: files } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { courseId: id, content, category },
      });
      const postId = createPostData?.createPost?.id;

      if (!postId) throw Error("something is wrong");

      if (file) {
        const { cloudinaryString } = await upload(
          file,
          user.uploadPreset,
          `Post_${postId}`
        );
        const { data: addAttachmentToPostData } = await addAttachmentToPost({
          variables: { id: postId, attachment: cloudinaryString },
        });

        if (!addAttachmentToPostData?.addAttachmentToPost?.id)
          throw Error("something is wrong");
      }

      alert("Created Post");

      refetch();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CourseContainer>
      <CoursePostsContainer>
        <CoursePostHeader>
          <PostFormContainer>
            <PostForm onSubmit={handleCreatePost} />
          </PostFormContainer>
          <CourseFilter>
            <button>Files</button>
            <button>Activities</button>
            <button>Members</button>
            <button>Groups</button>
          </CourseFilter>
        </CoursePostHeader>
        {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
      </CoursePostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h4>ABOUT</h4>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <h5>{name}</h5>
              <h5>
                Class Code: <p>&nbsp;{courseCode}</p>
              </h5>
              <h6>Subject Code: {subjCode}</h6>
              <h6>
                Faculty: {firstName}&nbsp;
                {lastName}
              </h6>
              <h6>Section: {yearAndSection}</h6>
            </>
          )}
        </RSideAbout>
        <RSideToDo>
          <h4>TO-DO</h4>
          <h6>TESSSSSSSSSSSSST</h6>
          <h6>TESSSSSSSSSSSSST</h6>
          <h6>TESSSSSSSSSSSSST</h6>
        </RSideToDo>
      </RSideContainer>
    </CourseContainer>
  );
};

const CourseContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const CoursePostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  button,
  select {
    width: 150px;
    height: 33px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
      border: solid #0f482f 1px;
    }
  }
`;

const PostFormContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  z-index: 1;
`;

const CourseFilter = styled.div`
  display: flex;
  position: sticky;
  top: 400px;
  height: 50px;
  width: 100%;
  align-items: center;
  margin: 10px 0px auto;
  border-bottom: solid #0f482f 3px;

  button {
    background-color: white;
    color: #0f482f;
    &:hover {
      background-color: #0e5937;
    }
  }
`;

const RSideContainer = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  border-radius: 10px;
  position: sticky;
  margin: 0 2em;
  h4 {
    margin: 0;
    color: #646464;
    font-size: 20px;
    font-weight: normal;
  }
  p {
    margin: 0;
    color: #646464;
  }

  h5 {
    margin: 0;
    color: #0f482f;
    text-align: left;
    font-size: 18px;
    font-weight: normal;
    display: flex;
  }
  h6 {
    margin: 0;
    font-size: 18px;
    color: #646464;
    font-weight: normal;
    text-align: left;
  }
`;

const RSideAbout = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f2f2f2;
  height: 362px;
  border-radius: 10px;
  padding: 2em;
`;

const RSideToDo = styled.div`
  display: flex;
  position: sticky;
  top: 490px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f2f2f2;
  height: 362px;
  border-radius: 10px;
  padding: 2em;
`;

const CoursePostHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 100%;
  background: white;
  z-index: 1;
`;

export default Course;
