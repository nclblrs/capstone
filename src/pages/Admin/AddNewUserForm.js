import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ADMIN_CREATE_USER, CREATE_ADMIN } from "./gql";

const AddNewUserForm = ({ onCreateFinish }) => {
  const [adminCreateUser, { loading: createUserLoading }] =
    useMutation(ADMIN_CREATE_USER);
  const [createAdmin, { loading: createAdminLoading }] =
    useMutation(CREATE_ADMIN);
  const loading = createUserLoading || createAdminLoading;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { firstName, middleName, lastName, email, schoolIdNumber, type } =
      data;

    if (type === "admin") {
      try {
        const { data } = await createAdmin({
          variables: {
            firstName,
            middleName,
            lastName,
            email,
            schoolIdNumber,
          },
        });

        if (data?.createAdmin?.id) {
          toast.success("Created successfully");
          onCreateFinish();
          reset();
        } else {
          throw Error("something is wrong");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data } = await adminCreateUser({
          variables: {
            firstName,
            middleName,
            lastName,
            email,
            schoolIdNumber,
            isTeacher: type === "teacher",
          },
        });

        if (data?.adminCreateUser?.id) {
          toast.success("Created successfully");
          onCreateFinish();
          reset();
        } else {
          throw Error("something is wrong");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName", { required: true })} />
      </div>
      <div>
        <label>Middle Name</label>
        <input {...register("middleName")} />
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("lastName", { required: true })} />
      </div>
      <div>
        <label>Email</label>
        <input {...register("email", { required: true })} />
      </div>
      <div>
        <label>School Number</label>
        <input {...register("schoolIdNumber", { required: true })} />
      </div>
      <div>
        <label>User Type</label>
        <select {...register("type", { required: true })}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
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
  }
`;

export default AddNewUserForm;
