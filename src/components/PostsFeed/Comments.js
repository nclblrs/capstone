import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { CREATE_POST_COMMENT, POST_COMMENTS, VOTE_COMMENT } from "./gql";

const Comments = ({ postId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { data, loading, refetch } = useQuery(POST_COMMENTS, {
    variables: { postId },
  });
  const [createPostComment] = useMutation(CREATE_POST_COMMENT);
  const [voteComment, { loading: voteLoading }] = useMutation(VOTE_COMMENT);

  const comments = data?.postComments?.data ?? [];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    const { content } = data;

    try {
      const { data } = await createPostComment({
        variables: { content, postId },
      });

      if (!data?.createPostComment?.id) throw Error("something is wrong");

      refetch();
      alert("Comment created!");
      reset();
    } catch (error) {
      alert("error");
    }

    setIsSubmitting(false);
  };

  const handleVote = async (commentId, vote) => {
    if (voteLoading) return;

    try {
      const { data } = await voteComment({ variables: { commentId, vote } });
      if (!data?.voteComment?.id) throw Error("something is wrong");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <CommentForm onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Write a comment" {...register("content")} />
        <button disabled={isSubmitting}>Comment</button>
      </CommentForm>

      {loading && "Loading comments..."}

      {!!comments.length &&
        comments.map(({ id, content, createdAt, user, vote, score }) => {
          const { firstName, lastName, id: userId } = user;

          return (
            <Comment>
              <img src={`https://picsum.photos/seed/${userId}/80/80`} alt="a" />
              <CommentContent>
                <h3>
                  {firstName} {lastName}
                </h3>
                <h4>{createdAt}</h4>
                <p>{content}</p>
              </CommentContent>
              <Votes>
                <IoIosArrowUp
                  size={30}
                  onClick={() => handleVote(id, vote === 1 ? 0 : 1)}
                  color={vote === 1 ? "#0f482f" : "#0f482f33"}
                />
                {score}
                <IoIosArrowDown
                  size={30}
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
  padding: 24px 18px;
  padding-right: 40px;
  display: flex;
  gap: 20px;

  > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
  }
`;

const CommentContent = styled.div`
  width: 100%;

  > h3 {
    margin: 0;
    color: #0f482f;
    font-size: 20px;
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
    font-size: 18px;
    font-weight: 400;
  }
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  > input {
    width: 100%;
    height: 40px;
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
  }
`;

const Votes = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #646464;
  font-size: 18px;

  svg {
    cursor: pointer;
  }
`;
