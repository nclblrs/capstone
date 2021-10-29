import React from "react";
import { toast } from "react-toastify";
import {
  ADD_ATTACHMENT_TO_POST,
  GROUP_POSTS,
  CREATE_GROUP_POST,
  GET_GROUP,
} from "./gql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, NavLink, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { MdAccountCircle, MdGroupAdd } from "react-icons/md";
import { RiFileCopy2Fill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import PostForm from "components/PostForm";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import PostsFeed from "components/PostsFeed";

const ClassGroup = () => {
  const { id } = useParams();
  const { user } = useCurrentUserContext();

  const [createPost] = useMutation(CREATE_GROUP_POST);
  const [addAttachmentToPost] = useMutation(ADD_ATTACHMENT_TO_POST);

  const { loading, data } = useQuery(GET_GROUP, {
    variables: { groupId: id },
  });
  const {
    data: postsData,
    loading: postsLoading,
    refetch,
  } = useQuery(GROUP_POSTS, {
    variables: { groupId: id },
  });

  const posts = postsData?.groupPosts?.data ?? [];

  const { name, leader, course, students } = data?.group ?? {};
  const { firstName, lastName } = leader?.user ?? {};

  const handleCreatePost = async (data) => {
    const { content, category, file: files } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { groupId: id, content, category },
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

      toast.success("Created Post");

      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CGContainer>
      <CGPostsContainer>
        <CGPostHeader>
          <PostFormContainer>
            <PostForm onSubmit={handleCreatePost} />
          </PostFormContainer>
          <CGFilter>
            <NavMenu to={`/group/${id}`} exact>
              <BiMessageDetail size={18} /> &nbsp; Posts
            </NavMenu>
            <NavMenu to={`/group/${id}/files`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Files
            </NavMenu>
            <NavMenu to={`/group/${id}/activities`}>
              <FaLaptop size={18} /> &nbsp; Activities
            </NavMenu>
            <NavMenu to={`/group/${id}/members`}>
              <MdGroupAdd size={18} />
              &nbsp; Members
            </NavMenu>
          </CGFilter>
        </CGPostHeader>
        <CGItemsContainer>
          <Switch>
            <Route path={`/group/${id}`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/group/${id}/files`}>
              <LeftContainer>
                <h1>Files</h1>
              </LeftContainer>
            </Route>
            <Route path={`/group/${id}/activities`}>
              <LeftContainer>
                <h1>Activities</h1>
              </LeftContainer>
            </Route>
            <Route path={`/group/${id}/members`}>
              <LeftContainer>
                <h1>Members</h1>
                <div className="leftContent">
                  {loading
                    ? "Loading..."
                    : students?.data?.map(({ id, user }) => (
                        <ul key={id}>
                          <li>
                            {user.lastName}, {user.firstName} {user.middleName}
                          </li>
                        </ul>
                      ))}
                </div>
              </LeftContainer>
            </Route>
          </Switch>
        </CGItemsContainer>
      </CGPostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h3>ABOUT</h3>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <h4>{course.name}</h4>
              <ul>
                <li>Group Name: {name}</li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Leader: {firstName}&nbsp;
                  {lastName}
                </li>
              </ul>
            </>
          )}
        </RSideAbout>
        <RSideToDo>
          <h3>TO-DO</h3>
        </RSideToDo>
      </RSideContainer>
    </CGContainer>
  );
};

const CGContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const CGPostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const CGFilter = styled.nav`
  display: flex;
  position: sticky;
  top: 400px;
  height: 50px;
  width: 100%;
  align-items: center;
  margin: 15px 0px auto;
  border-bottom: solid #0f482f 3px;
`;

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 400px;
  height: 100px;
  gap: 20px;
  min-width: 400px;
  flex-direction: column;
  border-radius: 10px;
  margin: 0 2em;

  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
  h4 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
  }
  p {
    margin: 0;
    color: #646464;
  }
  h5 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    padding-top: 10px;
  }
  ul {
    font-size: 20px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
    margin-top: 20px;
  }
  li {
    padding: 8px 8px;
  }
`;

const RSideAbout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 320px;
  border-radius: 10px;
  padding: 2em;
`;

const RSideToDo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`;

const CGItemsContainer = styled.div`
  width: 100%;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 7px 1em;
  margin: 0 1em;
  &:hover,
  &.active {
    background-color: #0e5937;
    color: white;
    border-radius: 5px;
  }
`;

const CGPostHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 100%;
  background: white;
  z-index: 1;
`;

const LeftContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  margin-top: 1.5em;
  overflow-y: scroll;
  width: 100%;
  height: 550px;
  flex-direction: column;
  h1 {
    color: #0f482f;
    padding: 0.5em 1.5em;
  }
  .leftContent {
    position: absolute;
    padding: 6em 2em;
    h5 {
      font-size: 20px;
      color: #0f482f;
    }
    ul {
      list-style-type: none;
      font-size: 20px;
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

export default ClassGroup;
