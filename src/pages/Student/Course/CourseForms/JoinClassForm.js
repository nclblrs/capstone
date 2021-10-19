import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { JOIN_COURSE, COURSE_FROM_COURSECODE } from "../gql";

const JoinClassForm = () => {
  const history = useHistory();
  const { register, handleSubmit, watch } = useForm();
  const courseCode = watch("courseCode", "");

  const { data } = useQuery(COURSE_FROM_COURSECODE, {
    variables: { courseCode },
  });
  const [joinCourse, { loading }] = useMutation(JOIN_COURSE);

  const { teacher, yearAndSection = "" } = data?.courseFromCourseCode ?? {};

  const onSubmit = async (data) => {
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
        <input disabled value={yearAndSection} />
      </div>
      <div>
        <label>Professor</label>
        <input
          disabled
          value={
            teacher ? `${teacher.user.firstName} ${teacher.user.lastName}` : ""
          }
        />
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
