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
import TagsInfo from "./Tabs/Tags";
import Files from "./Tabs/Files";

const StudyGroup = () => {
  const { groupId } = useParams();
  const { user } = useCurrentUserContext();
  const { tag } = useUrlQuery();

  const [createPost] = useMutation(CREATE_GROUP_POST);
  const [addAttachmentToPost] = useMutation(ADD_ATTACHMENT_TO_POST);

  const { loading, data } = useQuery(GET_GROUP, {
    variables: { groupId: groupId },
  });

  const {
    data: postsData,
    loading: postsLoading,
    refetch,
  } = useQuery(GROUP_POSTS, {
    variables: { groupId: groupId, tags: tag ? [tag] : [] },
  });

  const posts = postsData?.groupPosts?.data ?? [];

  const { name, groupCode, admins, students } = data?.group ?? {};

  const handleCreatePost = async (data) => {
    const { content, category, file: files, tags } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { groupId: groupId, content, category, tags },
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
            <NavMenu to={`/group/${groupId}`} exact>
              <BiMessageDetail size={18} /> &nbsp; Posts
            </NavMenu>
            <NavMenu to={`/group/${groupId}/files`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Files
            </NavMenu>
            <NavMenu to={`/group/${groupId}/tags`}>
              <HiOutlineHashtag size={18} />
              &nbsp; Tags
            </NavMenu>
            <NavMenu to={`/group/${groupId}/members`}>
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
            <Route path={`/group/:groupId`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/group/:groupId/files`}>
              <LeftContainer>
                <h1>Files</h1>
                <div className="filescontainer">
                  <Files />
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/:groupId/tags`}>
              <LeftContainer>
                <h1>Tags</h1>
                <div className="leftHeader">
                  <div className="tagcontainer">
                    <TagsInfo />
                  </div>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/:groupId/members`}>
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
        </SGItemsContainer>
      </SGPostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h3>ABOUT</h3>
          {loading
            ? "Loading..."
            : admins?.data?.map(({ id, user, leader }) => (
                <>
                  <h4 key={id}>{name}</h4>
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
        {/* <RSideQuestion>
          <h3>QUESTIONS</h3>
       </RSideQuestion> */}
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
    top: 351px;
    height: 75px;
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
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

/* const RSideQuestion = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`; */

const SGItemsContainer = styled.div`
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
  flex-direction: column;
  width: 100%;
  height: 550px;
  margin-top: 1.5em;
  overflow-y: scroll;
  > h1 {
    color: #0f482f;
    padding: 0.5em 1.5em;
  }
  .leftContent {
    position: absolute;
    padding: 4.2em 3em;
    ul {
      list-style-type: none;
      font-size: 20px;
    }
    > h5 {
      font-size: 20px;
      color: #0f482f;
    }
  }
  .tagcontainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
    height: 220px;
    margin-left: 3em;
    gap: 10px;
  }

  .filescontainer {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    height: 220px;
    margin: 0 3em;
  }
  .leftContent {
    position: absolute;
    padding: 6em 2em;
    ul {
      list-style-type: none;
      font-size: 20px;
    }
    > h5 {
      font-size: 20px;
      color: #0f482f;
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

export default StudyGroup;
