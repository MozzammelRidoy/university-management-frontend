import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const [login, { data, error }] = useLoginMutation();

  console.log("data=> ", data);
  console.log("error=> ", error);

  const onSubmit = (data: any) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
    console.log(userInfo);
  };
  return (
    <div>
      <h2>Login here</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID : </label>
          <input type="text" id="id" {...register("id")} />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input type="text" id="password" {...register("password")} />
        </div>

        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
