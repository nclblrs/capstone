import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { JOIN_COURSE } from "../gql";

const JoinClassForm = () => {
  const history = useHistory();

  const [joinCourse, { loading }] = useMutation(JOIN_COURSE);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { courseCode } = data;

    try {
      const { data } = await joinCourse({
        variables: {
          courseCode,
        },
      });

      if (data?.joinCourse?.id) {
        toast.success("Joined course successfully");
        history.push(`/class/${data?.joinCourse?.id}`);
      } else {
        throw Error("something is wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Class Code</label>
        <input {...register("courseCode", { required: true })} />
      </div>
      <div>
        <label>Year and Section</label>
        <input disabled />
      </div>
      <div>
        <label>Professor</label>
        <input disabled />
      </div>

      <button disabled={loading}>Submit</button>
    </Form>
  );
};

const Form = styled.form`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: inline-block;
    width: 140px;
  }

  input {
    width: 400px;
    font-size: 16px;
  }

  button {
    color: white;
    border: none;
    background-color: #0e5937;
    width: 100px;
    padding: 0.4em;
    font-size: 15px;
    margin-left: auto;
    cursor: pointer;
    margin-top: 10px;
  }
`;

export default JoinClassForm;
