import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Modal,
  Pagination,
  Segmented,
  Switch,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskById,
  getTaskData,
  handleTasksData,
  updateTaskById,
} from "./slice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const tasks = [
    {
      title: "Drink coffee",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "To do assignment",
      description: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Go to trip",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Going to College",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Going to bath ",
      description: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Going to make food ",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "To do Garage work",
      description: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Drink coffee HR ",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Drink coffee with Dean",
      description: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Drink coffee CEO",
      description: "i have to drink cofffe at evening time ",
      status: "completed",
    },
  ];
  const taskDatas = useSelector((state) => state.slice.taskData);
  const containerRef = useRef();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [taskData, setTaskData] = useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [paginationCount, setPaginationCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getTaskData());
  }, []);

  useEffect(() => {
    setTaskData(taskDatas);
  }, [taskDatas]);

  useEffect(() => {
    let temp = taskData?.slice(0, 6);
    setData(temp);
  }, [taskData]);

  const handleSort = (e) => {
    console.log("dragagfayfayta end", e, dragItem, dragOverItem);
    let tempData = [...data];
    const draggedItemContent = tempData.splice(dragItem.current, 1)[0];
    tempData.splice(dragOverItem.current, 0, draggedItemContent);
    console.log("draggedDtaata", dragItem.current, dragOverItem.current);
    dragItem.current = null;
    dragOverItem.current = null;
    setData(tempData);
  };

  const handlePagination = useCallback(
    (e) => {
      console.log("handlePagination", e * 6 - 6, e * 6);
      setPaginationCount(e);
      let temp = taskData?.slice(e * 6 - 6, e * 6);

      console.log("handlePagination dataa", temp);
      setData(temp);
    },
    [taskData]
  );

  const handleStatusChange = (e, updateTask) => {
    console.log("ndbhvfidhbcjknlmx", e);
    dispatch(
      updateTaskById({
        taskId: updateTask?.id,
        updatedData: {
          ...updateTask,
          status: e.target.checked == false ? "pending" : "completed",
        },
      })
    );
  };

  const handleAddTask = (values) => {
    if (updateTask) {
      dispatch(
        updateTaskById({
          taskId: updateTask?.id,
          updatedData: { ...values, status: "pending" },
        })
      );
    } else {
      //   setTaskData((prev) => [{ ...values, status: "pending" }, ...prev]);
      dispatch(handleTasksData({ ...values, status: "pending" }));
    }
    setOpenModal(false);
    form.resetFields();
    setUpdateTask(null);
  };

  const handleUpdateTask = (data) => {
    setUpdateTask(data);
    setOpenModal(true);
    console.log("sndjhfghsjkndnkjfhjbn", data);
    form.setFieldsValue({
      title: data?.title,
      description: data?.description,
    });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskById(id));
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Ensure case-insensitive search
    setSearchText(searchTerm);
    console.log("sjhgdfidhcvgdshbknj", searchTerm);
    if (searchTerm != "") {
      const filtered = taskData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      setData(filtered);
    } else {
      let temp = taskData?.slice(paginationCount * 6 - 6, paginationCount * 6);
      console.log("handlePagination dataa", temp);
      setData(temp);
    }
  };

  const items = [
    {
      label: "Logout",
      key: "1",
      //   icon: <UserOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    console.log("click", e);
    navigate("/");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  console.log("taskDtatatatattatataa", taskDatas);

  return (
    <div className="w-full h-full flex items-center flex-col gap-y-8">
      <div className="w-full bg-gray-500 flex justify-end px-10 py-3">
        <Dropdown menu={menuProps} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar size={"large"}>AK</Avatar>
            <h4 className="text-white">Avnish kumar</h4>
          </div>
        </Dropdown>
      </div>
      <div className="w-full flex items-center flex-col gap-y-8">
        <div className="w-3/4 flex justify-between items-center gap-3">
          <Input
            size="large"
            value={searchText}
            placeholder="search task"
            onChange={handleSearchChange}
          />{" "}
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add Task
          </Button>
        </div>
        <div
          ref={containerRef}
          className="h-mh md:h-full max-h-full overflow-auto w-full max-w-full flex gap-2 flex-col px-8 py-3"
        >
          {data?.map((item, idx) => {
            return (
              <div
                className="flex justify-between items-center px-4 py-6 cursor-pointer rounded-md shadow-card hover:bg-gray-300 "
                key={idx}
                style={{
                  background:
                    item?.status === "completed" ? "#99ff99" : "#d9d9d9",
                }}
                // onClick={() => {
                //   setCurrentVideoData({ index: idx, info: item });
                // }}
                draggable={true}
                onDragStart={(e) => {
                  console.log("dragagfayfayta start", e);
                  return (dragItem.current = idx);
                }}
                onDragEnter={(e) => {
                  console.log("dragagfayfayta enter", e);
                  return (dragOverItem.current = idx);
                }}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex items-center gap-3">
                  {/* <h2 className="text-black-400 text-lg">{idx + 1}</h2> */}
                  <div>
                    <h2 className="text-black-400 text-lg">{item?.title}</h2>
                    <h3 className="text-black-200 text-xs">
                      {item?.description}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="fluent:edit-24-regular"
                    onClick={() => {
                      handleUpdateTask(item);
                    }}
                  />
                  <Icon
                    icon="fluent:delete-24-regular"
                    onClick={() => {
                      handleDeleteTask(item?.id);
                    }}
                  />
                  <p>{item?.status}</p>
                  <Checkbox
                    checked={item?.status === "completed" ? true : false}
                    onChange={(e) => {
                      handleStatusChange(e, item);
                    }}
                  />

                  <Icon
                    icon="fluent:re-order-dots-vertical-20-regular"
                    className="cursor-move"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {data?.length > 5 && (
          <div>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={6}
              onChange={handlePagination}
              total={taskData.length}
              disabled={data?.length < 6 ? true : false}
            />
          </div>
        )}
      </div>

      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
      >
        <div>
          <Form layout="vertical" form={form} onFinish={handleAddTask}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Add task
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
