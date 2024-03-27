import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "https://advancetaskmanagement-default-rtdb.firebaseio.com/";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-type": "application/json",
//   },
// });

const initialState = {
  userData: [],
  taskData: [],
};

// get supertoken id
// export const createSuperTokenObject = createAsyncThunk(
//   "createSuperTokenObject",
//   async (data) => {
//     const response = await api.post(`supertoken/`, data);
//     return response.data;
//   }
// );

export const postUserDetail = createAsyncThunk("userDetail", async (data) => {
  const response = await axios.post(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/userDetails.json`,
    data
  );
  return response.data;
});

export const getuserData = createAsyncThunk("getUserDetail", async () => {
  const response = await axios.get(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/userDetails.json`
  );
  return response.data;
});

export const handleTasksData = createAsyncThunk("taskData", async (data) => {
  await axios.post(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks.json`,
    data
  );

  const getAllUrl =
    "https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks.json";
  const response = await axios.get(getAllUrl);
  return response.data;
});

export const getTaskData = createAsyncThunk("getTaskData", async () => {
  const response = await axios.get(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks.json`
  );
  return response.data;
});

export const deleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (taskId) => {
    const url = `https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks/${taskId}.json`;
    await axios.delete(url);
    const getAllUrl =
      "https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks.json";
    const response = await axios.get(getAllUrl);
    return response.data;
  }
);

export const updateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ taskId, updatedData }) => {
    const url = `https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks/${taskId}.json`;
    await axios.patch(url, updatedData);
    const getAllUrl =
      "https://advancetaskmanagement-default-rtdb.firebaseio.com/tasks.json";
    const response = await axios.get(getAllUrl);
    return response.data;
  }
);

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getuserData.fulfilled, (state, action) => {
      console.log("kdnjhggchjnkmlecfnvcgdhj", action.payload);

      const firebaseData = action.payload;
      const jsonData = Object.keys(firebaseData).map((key) => ({
        id: key,
        ...firebaseData[key],
      }));

      console.log("kdnjhggchjnkmlecfnvcgdhj   out ", jsonData);

      state.userData = jsonData;
    });

    builder.addCase(getTaskData.fulfilled, (state, action) => {
      console.log("kdnjhggchjnkmlecfnvcgdhj", action.payload);

      const firebaseData = action.payload;
      const jsonData = Object.keys(firebaseData).map((key) => ({
        id: key,
        ...firebaseData[key],
      }));

      console.log("kdnjhggchjnkmlecfnvcgdhj   out ", jsonData);

      state.taskData = jsonData?.reverse();
    });


    builder.addCase(handleTasksData.fulfilled, (state, action) => {
        const firebaseData = action.payload;
        const jsonData = Object.keys(firebaseData).map((key) => ({
          id: key,
          ...firebaseData[key],
        }));
        console.log("kdnjhggchjnkmlecfnvcgdhj   out ", jsonData);
        state.taskData = jsonData?.reverse();
      });



    builder.addCase(updateTaskById.fulfilled, (state, action) => {
      const firebaseData = action.payload;
      const jsonData = Object.keys(firebaseData).map((key) => ({
        id: key,
        ...firebaseData[key],
      }));
      console.log("kdnjhggchjnkmlecfnvcgdhj   out ", jsonData);
      state.taskData = jsonData?.reverse();
    });

    builder.addCase(deleteTaskById.fulfilled, (state, action) => {
      const firebaseData = action.payload;
      const jsonData = Object.keys(firebaseData).map((key) => ({
        id: key,
        ...firebaseData[key],
      }));
      console.log("kdnjhggchjnkmlecfnvcgdhj   out ", jsonData);
      state.taskData = jsonData?.reverse();
    });
  },
});

export const {} = slice.actions;

export default slice.reducer;
