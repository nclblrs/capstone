import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { SEND_RESET_PASSWORD } from "./gql";

const ForgotPassword = () => {
  const [sendResetPasswordEmail, { loading }] =
    useMutation(SEND_RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const { data } = await sendResetPasswordEmail({
        variables: { email },
      });

      if (!data) {
        throw Error("something is wrong");
      }

      toast.success("Check your email");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="email" name="email" />
      <button type="submit" disabled={loading}>
        Send reset password email
      </button>
    </form>
  );
};

export default ForgotPassword;
