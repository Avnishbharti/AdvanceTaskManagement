import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getuserData } from "./slice";

const Login = () => {
  const details = useSelector((state) => state.slice.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isAutenticated, setIsAutenticated] = useState(false);

  useEffect(() => {
    dispatch(getuserData());
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Logged in successfully",
      duration: 10,
    });
  };

  const handleFinish = useCallback(
    (values) => {
      let filterData = details?.filter(
        (item) =>
          item?.email == values?.email && item?.password == values?.password
      );

      if (filterData?.length > 0) {
        setIsAutenticated(false);
        success();
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
      } else {
        setIsAutenticated(true);
      }
    },
    [details]
  );

  return (
    <div className="flex flex-col justify-center items-center gap-y-15 w-2/5 py-20 bg-white rounded-2xl shadow-formCard ">
      <h1 className="text-5xl">Login</h1>
      {isAutenticated && (
        <p className="text-red-500">Email and password is wrong</p>
      )}
      <Form
        layout="vertical"
        size="large"
        style={{ width: "70%" }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="flex gap-2">
        <h3>Don't have account </h3>{" "}
        <Link className="text-blue-500" to={"/signup"}>
          {" "}
          signup
        </Link>{" "}
      </div>
      {contextHolder}
    </div>
  );
};

// border border-black rounded-2xl

export default Login;
