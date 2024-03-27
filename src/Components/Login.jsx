import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-15 w-2/5 py-20 bg-white rounded-2xl shadow-formCard ">
      <h1 className="text-5xl">Login</h1>
      <Form layout="vertical" size="large" style={{ width: "70%" }}>
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
    </div>
  );
};

// border border-black rounded-2xl

export default Login;
