import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ConfigProvider } from "antd";
import Dashboard from "./Components/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    }

  ]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Input: {
              borderRadiusLG: "4px",
            },
            Button: {
              borderRadiusLG: "4px",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
