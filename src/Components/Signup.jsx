import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getuserData, postUserDetail } from "./slice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.slice.userData);
  const userDetail = useSelector((state) => state.slice.userDetail);
  const editUserDetail = useSelector((state) => state.slice.editUserDetail);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "User Details successfull stored",
      duration: 10,
    });
  };

  useEffect(() => {
    dispatch(getuserData());
  }, []);

  useEffect(() => {
    if (editUserDetail) {
      form.setFieldsValue({
        name: userDetail?.title,
        email: userDetail?.description,
        password: userDetail?.password,
      });
    }
  }, []);

  const handleSubmit = async (data) => {
    console.log("jkdhjgfuiyeguhiwsjokl,", data);
    dispatch(postUserDetail(data));
    navigate("/");
  };

  console.log("njdhgfyguhsijnjkcdhbvdbjnskl", details);

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Please input your password");
    }
    // Check if password meets the criteria (at least 8 characters long and includes numbers, letters, and symbols)
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        value
      )
    ) {
      return Promise.reject(
        "Password should be at least 8 characters long and include numbers, letters, and symbols"
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-15 w-2/5 py-20 bg-white rounded-2xl shadow-formCard ">
      <h1 className="text-5xl">Sign up</h1>
      <Form
        layout="vertical"
        size="large"
        style={{ width: "70%" }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              //   message: "Please input valid name",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value.length > 5) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Name must be longer than 5 characters")
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
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
          //   rules={[{ required: true, message: "Please input your password" }]}
          rules={[{ required: true, validator: validatePassword }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={success}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="flex gap-2">
        <h3>Already have an account </h3>{" "}
        <Link className="text-blue-500" to={"/"}>
          login
        </Link>{" "}
      </div>
      {contextHolder}
    </div>
  );
};

export default Signup;
