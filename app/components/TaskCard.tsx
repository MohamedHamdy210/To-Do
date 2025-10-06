import { deleteTask, updateTask } from "@/lib/tasks";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TaskModal from "./TaskModal";

type TaskCardProps = {
  id?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  attachment:{
    url:string,
    public_id:string
  };
  createdAt?: string;
  setIsModelOpen: Dispatch<SetStateAction<boolean>>;
  setModelData: Dispatch<
    SetStateAction<{
      modalId: string;
      modalDescription: string;
      modalTitle: string;
      modalStatus: string;
      modalPriority: string;
      modalAttachment: {
        url: string;
        public_id: string;
      };
      type: string;
    }>
  >;
};

const TaskCard = ({
  id = "id",
  title = "Task To-Do",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, nisi quos omnis tempore quia in aliquam aliquid distinctio placeat? Illum, hic? Expedita impedit, fugit provident animi itaque nostrum odit qui.",
  priority = "High",
  status = "In Progress",
  attachment = {
        url: "",
        public_id: ""
      },
  createdAt = "12/12/2023",
  setIsModelOpen,
  setModelData,
}: TaskCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    taskId: "",
    taskDescription: "",
    taskTitle: "",
    taskStatus: "",
    taskPriority: "",
    taskAttachment: {
      url: "",
      public_id: "",
    },
    taskCreatedAt: "",
  });

  useEffect(() => {
    // trigger after mount
    setShow(true);
  }, []);
  
  const handleDelete = async () => {
    await deleteTask(id)
    if(attachment.public_id){

      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({public_id:attachment.public_id}),
      });
      
      const data = await res.json();
      
    }
  };
  return (
    <>
      {isTaskOpen && (
        <TaskModal
          setModalData={setModelData}
          setIsFormModal={setIsModelOpen}
          {...taskData}
          setIsTaskOpen={setIsTaskOpen}
        />
      )}
      <div
        className={`border-1 border-gray-400 shadow  transition-all  hover:scale-103   w-full p-2 flex flex-col gap-2 rounded-xl 
        duration-500 cursor-pointer
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        onClick={() => {
          setTaskData({
            taskId: id || "",
            taskDescription: description,
            taskTitle: title,
            taskStatus: status,
            taskPriority: priority,
            taskAttachment:attachment || {
              url: "",
              public_id: "",
            },
            taskCreatedAt: createdAt ?? "",
          });
          setIsTaskOpen(true);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2 w-[80%] items-center">
            <Image
              src={
                status === "Not Started"
                  ? "/redRing.svg"
                  : status === "Completed"
                  ? "/greenRing.svg"
                  : "/blueRing.svg"
              }
              alt="ring"
              width={12}
              height={12}
            />
            <h1 className="text-lg line-clamp-1 font-semibold">{title}</h1>
          </div>
          <div
            className="relative cursor-pointer mx-3"
            onClick={(e)=>{
              e.stopPropagation()
              setMenuOpen(prev=>!prev)}}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => {
              setMenuOpen(false);
            }}
          >
            <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
            {menuOpen && (
              <div className=" bg-white absolute top-5 -left-5  flex flex-col gap-3 justify-center rounded-lg p-2"
              onClick={(e)=>e.stopPropagation()}
              >
                <button
                  className="cursor-pointer hover:bg-black/20 w-full p-1 rounded-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModelData({
                      modalId: id,
                      modalDescription: description,
                      modalTitle: title,
                      modalStatus: status,
                      modalPriority: priority,
                      modalAttachment: attachment,
                      type: "edit",
                    });

                    setIsModelOpen(true);
                  }}
                  className="hover:bg-black/20 w-full p-1 rounded-md cursor-pointer"
                >
                  Edit
                </button>
                <button
                  className="hover:bg-black/20 w-full p-1 rounded-md cursor-pointer"
                  onClick={() => {
                    updateTask({
                      uid: "",
                      id,
                      title,
                      description,
                      priority,
                      status: "Completed",
                      attachment,
                    });
                  }}
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center px-3">
          <div className="w-3/4 line-clamp-3 text-gray-500">{description}</div>
          <div className="hidden md:block">
            <Image
              src={attachment.url.length>0 ? attachment.url : "/placeholder.svg"}
              alt="attachment"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm px-3 ">
          <span className="font-semibold ">
            priority:{" "}
            <span
              className={`font-normal ${
                priority === "Extreme"
                  ? "text-[#F21E1E]"
                  : priority === "Low"
                  ? "text-[#05A301]"
                  : "text-[#54ADE2]"
              }`}
            >
              {priority}
            </span>
          </span>
          <span className="font-semibold ">
            Status:{" "}
            <span
              className={`font-normal ${
                status === "Not Started"
                  ? "text-[#F21E1E]"
                  : status === "Completed"
                  ? "text-[#05A301]"
                  : "text-[#0225FF]"
              }  `}
            >
              {status}
            </span>
          </span>
          <span className="text-gray-400 ">Created at: {createdAt}</span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
