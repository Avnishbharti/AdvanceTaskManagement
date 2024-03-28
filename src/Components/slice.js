import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  taskData: [],
  userDetail: {},
  editUserDetail: false,
};

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

  console.log('jshcgdvftuvygsihxbnjkmaddddd',data)


  await axios.post(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/${data?.domain}tasks.json`,
    data?.data
  );

  const getAllUrl = `https://advancetaskmanagement-default-rtdb.firebaseio.com/${data?.domain}tasks.json`;
  const response = await axios.get(getAllUrl);
  return response.data;
});

export const getTaskData = createAsyncThunk("getTaskData", async (domain) => {

  console.log('jshcgdvftuvygsihxbnjkm all',domain)
  const response = await axios.get(
    `https://advancetaskmanagement-default-rtdb.firebaseio.com/${domain}tasks.json`
  );
  return response.data;
});

export const deleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (info) => {
    const url = `https://advancetaskmanagement-default-rtdb.firebaseio.com/${info?.domain}tasks/${info?.data}.json`;
    await axios.delete(url);
    const getAllUrl = `https://advancetaskmanagement-default-rtdb.firebaseio.com/${info?.domain}tasks.json`;
    const response = await axios.get(getAllUrl);
    return response.data;
  }
);

export const updateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ domain, data }) => {
    const url = `https://advancetaskmanagement-default-rtdb.firebaseio.com/${domain}tasks/${data?.taskId}.json`;
    await axios.patch(url, data?.updatedData);
    const getAllUrl = `https://advancetaskmanagement-default-rtdb.firebaseio.com/${domain}tasks.json`;
    const response = await axios.get(getAllUrl);
    return response.data;
  }
);

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.userDetail = action.payload;
    },
    isEditUserDetail: (state, action) => {
      state.editUserDetail = action.payload;
    },
  },
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

export const { userDetails, isEditUserDetail } = slice.actions;

export default slice.reducer;
