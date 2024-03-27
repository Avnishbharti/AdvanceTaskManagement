import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ConfigProvider } from "antd";
import Dashboard from "./Components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
// import { store } from "./store";

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
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
