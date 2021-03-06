import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { CREATE_STUDY_GROUP } from "../gql";

const CreateSGroupForm = () => {
  const history = useHistory();

  const [createStudyGroup, { loading }] = useMutation(CREATE_STUDY_GROUP);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { name } = data;

    try {
      const { data } = await createStudyGroup({
        variables: {
          name,
        },
      });

      if (data?.createStudyGroup?.id) {
        toast.success("Created successfully");
        history.push(`/group/${data?.createStudyGroup?.id}`);
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
        <label>Group Name</label>
        <input {...register("name", { required: true })} />
      </div>
      <div>
        <label>Activate Until</label>
        <input type="date" />
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

export default CreateSGroupForm;
