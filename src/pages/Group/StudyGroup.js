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
import { HiOutlineHashtag } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import PostsFeed from "components/PostsFeed";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import PostForm from "components/PostForm";
import { useUrlQuery } from "hooks/useUrlQuery";
import TagsInfo from "./StudyGroupTabs/Tags";

const StudyGroup = () => {
  let { id } = useParams();
  const { user } = useCurrentUserContext();
  const { tag } = useUrlQuery();

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
    variables: { groupId: id, tags: tag ? [tag] : [] },
  });

  const posts = postsData?.groupPosts?.data ?? [];

  const { name, groupCode, admins, students } = data?.group ?? {};

  const handleCreatePost = async (data) => {
    const { content, category, file: files, tags } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { groupId: id, content, category, tags },
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
    <SGContainer>
      <SGPostsContainer>
        <SGPostHeader>
          <PostFormContainer>
            <PostForm withTags onSubmit={handleCreatePost} />
          </PostFormContainer>
          <SGFilter>
            <NavMenu to={`/group/${id}`} exact>
              <BiMessageDetail size={18} /> &nbsp; Posts
            </NavMenu>
            <NavMenu to={`/group/${id}/files`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Files
            </NavMenu>
            <NavMenu to={`/group/${id}/tags`}>
              <HiOutlineHashtag size={18} />
              &nbsp; Tags
            </NavMenu>
            <NavMenu to={`/group/${id}/members`}>
              <MdGroupAdd size={18} />
              &nbsp; Members
            </NavMenu>
          </SGFilter>
        </SGPostHeader>
        {tag ? (
          <div className="tagtitle">
            <h1>#{tag}</h1>
          </div>
        ) : null}
        <SGItemsContainer>
          <Switch>
            <Route path={`/group/:id`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/group/:id/files`}>
              <LeftContainer>
                <div className="leftHeader">
                  <h1>Files</h1>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/:id/tags`}>
              <LeftContainer>
                <div className="leftHeader">
                  <h1>Tags</h1>
                  <div className="tagcontainer">
                    <TagsInfo />
                  </div>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/:id/members`}>
              <LeftContainer>
                <div className="leftHeader">
                  <h1>Members</h1>
                </div>
                <div className="leftContent">
                  {loading
                    ? "Loading..."
                    : students?.data?.map(({ user }) => (
                        <>
                          <h5>
                            <li>
                              {user.lastName}, {user.firstName}{" "}
                              {user.middleName}
                            </li>
                          </h5>
                        </>
                      ))}
                </div>
              </LeftContainer>
            </Route>
          </Switch>
        </SGItemsContainer>
      </SGPostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h3>ABOUT</h3>
          {loading
            ? "Loading..."
            : admins?.data?.map(({ user }) => (
                <>
                  <h4>{name}</h4>
                  <h5>
                    Group Code: <p>&nbsp; {groupCode}</p>
                  </h5>
                  <ul>
                    <li>
                      <MdAccountCircle size={18} />
                      &nbsp; Admins: {user.firstName} {user.lastName}
                    </li>
                  </ul>
                </>
              ))}
        </RSideAbout>
        <RSideQuestion>
          <h3>QUESTIONS</h3>
        </RSideQuestion>
      </RSideContainer>
    </SGContainer>
  );
};

const SGContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const SGPostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  .tagtitle {
    position: sticky;
    top: 353px;
    height: 100px;
    background-color: #e8e8e8;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom: solid 1px #0f482f;
    padding: 1em;
    z-index: 1;
    > h1 {
      margin: 0;
      color: #0f482f;
    }
  }
`;

const SGFilter = styled.nav`
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

const RSideQuestion = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`;

const SGItemsContainer = styled.div`
  width: 100%;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 10px 1em;
  margin: 0 1em;
  &:hover,
  &.active {
    background-color: #0e5937;
    color: white;
    border-radius: 5px;
  }
`;

const SGPostHeader = styled.div`
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
  margin: 2em 0;
  padding: 2em;
  flex-direction: column;
  .leftHeader {
    height: 20%;
    h1 {
      color: #0e5937;
    }
  }
  h5 {
    font-weight: normal;
    color: #0e5937;
    font-size: 20px;
  }
  li {
    margin: 0 2em;
  }
  .tagcontainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
    height: 220px;
  }
`;

const PostFormContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  z-index: 1;
`;

export default StudyGroup;
