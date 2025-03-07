/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { handleSubmit, register } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    console.log(data);

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged in successfully!", { id: toastId, duration: 1000 });
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId, duration: 1000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"id"} label={"ID :"} />

        <PHInput type={"text"} name={"password"} label={"Password :"} />

        <Button htmlType="submit">Login</Button>
      </PHForm>
      {/* <PHForm onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">ID : </label>
          <input type="text" id="id" {...register("id")} />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input type="text" id="password" {...register("password")} />
        </div>

        <Button htmlType="submit">Login</Button>
      </PHForm> */}
    </Row>
  );
};

export default Login;
