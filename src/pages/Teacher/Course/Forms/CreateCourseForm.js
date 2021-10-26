import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { CREATE_COURSE } from "./gql";

const CreateCourseForm = () => {
  const history = useHistory();
  const [createCourse, { loading }] = useMutation(CREATE_COURSE);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { name, subjCode, yearAndSection, startsAt, endsAt } = data;

    try {
      const { data } = await createCourse({
        variables: {
          name,
          subjCode,
          yearAndSection,
          startsAt,
          endsAt,
        },
      });

      if (data?.createCourse?.id) {
        toast.success("Created successfully");
        history.push(`/course/${data?.createCourse.id}`);
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
        <label>Course Name</label>
        <input {...register("name", { required: true })} />
      </div>
      <div>
        <label>Subject Code</label>
        <input {...register("subjCode", { required: true })} />
      </div>
      <div>
        <label>Year and Section</label>
        <input {...register("yearAndSection", { required: true })} />
      </div>
      <div>
        <label>Starts At </label>
        <input type="date" {...register("startsAt", { required: true })} />
      </div>
      <div>
        <label>Ends At</label>
        <input type="date" {...register("endsAt", { required: true })} />
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

export default CreateCourseForm;
