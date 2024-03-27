import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Pagination,
  Segmented,
  Switch,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const tasks = [
    {
      title: "Drink coffee",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "To do assignment",
      discription: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Go to trip",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Going to College",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Going to bath ",
      discription: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Going to make food ",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "To do Garage work",
      discription: "i have to drink cofffe at evening time ",
      status: "completed",
    },
    {
      title: "Drink coffee HR ",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Drink coffee with Dean",
      discription: "i have to drink cofffe at evening time ",
      status: "pending",
    },
    {
      title: "Drink coffee CEO",
      discription: "i have to drink cofffe at evening time ",
      status: "completed",
    },
  ];

  const containerRef = useRef();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [taskData, setTaskData] = useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setTaskData(tasks);
  }, []);

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
    // if (currentVideoData?.index === dragItem.current) {
    //   setCurrentVideoData((prev) => ({ ...prev, index: dragOverItem.current }));
    // }
    dragItem.current = null;
    dragOverItem.current = null;
    setData(tempData);
  };

  const handlePagination = useCallback(
    (e) => {
      console.log("handlePagination", e * 6 - 6, e * 6);
      let temp = taskData?.slice(e * 6 - 6, e * 6);

      console.log("handlePagination dataa", temp);
      setData(temp);
    },
    [taskData]
  );

  const handleStatusChange = (e, idx) => {
    console.log("ndbhvfidhbcjknlmx", e);

    setData((prev) => {
      let temparr = [...prev];
      let tempobj = { ...temparr[idx] };
      let res = {
        ...tempobj,
        status: e.target.checked == false ? "pending" : "completed",
      };
      temparr[idx] = res;
      return temparr;
    });
  };

  const handleAddTask = (values) => {
    setTaskData((prev) => [{ ...values, status: "pending" }, ...prev]);
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <div className="w-full h-full flex items-center flex-col gap-y-8">
      <div className="w-full bg-gray-500 flex justify-end px-10 py-3">
        <div className="flex items-center gap-2">
          <Avatar size={"large"}>AK</Avatar>
          <h4 className="text-white">Avnish kumar</h4>
        </div>
      </div>
      <div className="w-full flex items-center flex-col gap-y-8">
        <div className="w-3/4 flex justify-between items-center gap-3">
          <Input size="large" placeholder="search task" />{" "}
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
                      {item?.discription}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{item?.status}</p>
                  <Checkbox
                    checked={item?.status === "completed" ? true : false}
                    onChange={(e) => {
                      handleStatusChange(e, idx);
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
        <div>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={6}
            onChange={handlePagination}
            total={taskData.length}
          />
        </div>
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
