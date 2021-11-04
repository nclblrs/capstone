import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import dayjs from "dayjs";

import { CREATE_POST_COMMENT, POST_COMMENTS, VOTE_COMMENT } from "./gql";
import ViewportBlock from "components/ViewportBlock";
import { smallProfpicUrl } from "utils/upload";

const Comments = ({ postId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { data, loading, refetch } = useQuery(POST_COMMENTS, {
    variables: { postId },
    skip: !loadComments,
  });
  const [createPostComment] = useMutation(CREATE_POST_COMMENT);
  const [voteComment, { loading: voteLoading }] = useMutation(VOTE_COMMENT);

  const comments = data?.postComments?.data ?? [];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { content } = data;

    try {
      const { data } = await createPostComment({
        variables: { content, postId },
      });

      if (!data?.createPostComment?.id) throw Error("something is wrong");

      refetch();
      toast.success("Comment created!");
      reset();
    } catch (error) {
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  const handleVote = async (commentId, vote) => {
    if (voteLoading) return;

    try {
      const { data } = await voteComment({ variables: { commentId, vote } });
      if (!data?.voteComment?.id) throw Error("something is wrong");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <CommentForm onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Write a comment"
          {...register("content", { required: true })}
        />
        <button disabled={isSubmitting}>Comment</button>
      </CommentForm>
      <ViewportBlock onEnterViewport={() => setLoadComments(true)} />
      {loading && "Loading comments..."}

      {!!comments.length &&
        comments.map(({ id, content, createdAt, user, vote, score }) => {
          const { firstName, lastName, profilePicture } = user;
          const { secure_url } = JSON.parse(profilePicture) ?? {};
          return (
            <Comment key={id}>
              <img src={smallProfpicUrl(secure_url)} alt="a" />
              <CommentContent>
                <h3>
                  {firstName} {lastName}
                </h3>
                <h4>{dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}</h4>
                <p>{content}</p>
              </CommentContent>
              <Votes>
                <IoIosArrowUp
                  size={25}
                  onClick={() => handleVote(id, vote === 1 ? 0 : 1)}
                  color={vote === 1 ? "#0f482f" : "#0f482f33"}
                />
                {score}
                <IoIosArrowDown
                  size={25}
                  onClick={() => handleVote(id, vote === -1 ? 0 : -1)}
                  color={vote === -1 ? "#0f482f" : "#0f482f33"}
                />
              </Votes>
            </Comment>
          );
        })}
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 10px;
`;

const Comment = styled.div`
  border: 1px solid #646464;
  border-radius: 4px;
  width: 100%;
  padding: 15px 18px;
  padding-right: 40px;
  display: flex;
  gap: 20px;
  height: 140px;

  > img {
    margin-top: 10px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;

const CommentContent = styled.div`
  width: 100%;

  > h3 {
    margin: 0;
    color: #0f482f;
    font-size: 18px;
    font-weight: 400;
    margin: 8px 0;
  }
  > h4 {
    margin: 0;
    color: #646464;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;

    .category,
    .tags > span {
      background: #e7b22a;
      color: white;
      font-size: 14px;
      padding: 4px 10px;
      border-radius: 4px;
      margin-right: 12px;
    }

    .tags {
      margin-left: 12px;
      > span {
        background: #646464;
      }
    }
  }
  > p {
    color: #0f482f;
    font-size: 16px;
    font-weight: 400;
  }
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  > input {
    width: 100%;
    height: 40px;
    padding: 1em;
  }

  > button {
    background: #0e5937;
    color: white;
    height: 30px;
    padding: 10px 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;
  }
`;

const Votes = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #646464;
  font-size: 16px;

  svg {
    cursor: pointer;
  }
`;
