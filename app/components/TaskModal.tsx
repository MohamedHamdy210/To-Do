import { deleteTask } from "@/lib/tasks";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const TaskModal = ({
  setIsFormModal,
  taskTitle,
  taskPriority,
  taskDescription,
  taskStatus,
  taskAttachment,
  taskId,
  setIsTaskOpen,
  setModalData,
  taskCreatedAt,
}: {
  setIsFormModal: Dispatch<SetStateAction<boolean>>;
  setIsTaskOpen: Dispatch<SetStateAction<boolean>>;
  taskTitle: string;
  taskPriority: string;
  taskDescription: string;
  taskStatus: string;
  taskAttachment: {
    url: string;
    public_id: string
  };
  taskId: string;
  taskCreatedAt?: string;
  setModalData: Dispatch<
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
}) => {

  const handleDelete = async () => {
      await deleteTask(taskId)
      if(taskAttachment.public_id){
  
        const res = await fetch("/api/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({public_id:taskAttachment.public_id}),
        });
        
        const data = await res.json();
        
      }
    };
  return (
    <div
      className="w-screen h-screen absolute left-0 top-0 bg-black/60  z-40 flex items-center justify-center"
      onClick={() => {
        setIsTaskOpen(false);
      }}
    >
      <div
        className="bg-white flex flex-col  p-4 rounded-md relative w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] text-xs md:text-base max-h-[82dvh] overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="cursor-pointer absolute right-4 top-4 ">
          <Image
            alt=""
            src="/close.png"
            width={14}
            height={14}
            onClick={() => {
              setIsTaskOpen(false);
            }}
          />
        </div>
        <div className="flex gap-5 items-center">
          <Image
            src={taskAttachment.url.length>0 ? taskAttachment.url : "/placeholder.svg"}
            width={200}
            height={200}
            alt="pic"
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{taskTitle}</h1>

            <h3 className="text-gray-400 ">Created at: {taskCreatedAt}</h3>
          </div>
        </div>
        <div className="my-3 flex flex-col gap-3">
          <div className="">
            <span className="font-semibold text-xl ">Task Description</span>:{" "}
            <span className="text-lg text-gray-600">{taskDescription}</span>
          </div>
          <div className="">
            <span className="font-semibold text-xl ">Priority</span>:{" "}
            <span
              className={` text-lg ${
                taskPriority === "Extreme"
                  ? "text-[#F21E1E]"
                  : taskPriority === "Low"
                  ? "text-[#05A301]"
                  : "text-[#54ADE2]"
              }`}
            >
              {taskPriority}
            </span>
          </div>
          <div className="">
            <span className="font-semibold text-xl ">Task Status</span>:{" "}
            <span
              className={`font-normal ${
                taskStatus === "Not Started"
                  ? "text-[#F21E1E]"
                  : taskStatus === "Completed"
                  ? "text-[#05A301]"
                  : "text-[#0225FF]"
              }  `}
            >
              {taskStatus}
            </span>
          </div>
          <div className="flex gap-3 justify-end ">
            <button
              className="bg-[#ff6767] p-2 rounded-md cursor-pointer transition-colors hover:bg-[#f00]"
              onClick={
                handleDelete
              }
            >
              <Image src={"/delete.svg"} height={15} width={15} alt="delete" />
            </button>
            <button
              className="bg-[#ff6767] p-2 rounded-md cursor-pointer transition-colors hover:bg-[#f00]"
              onClick={() => {
                setModalData({
                  modalId: taskId,
                  modalDescription: taskDescription,
                  modalTitle: taskTitle,
                  modalStatus: taskStatus,
                  modalPriority: taskPriority,
                  modalAttachment: taskAttachment,
                  type: "edit",
                });
                setIsFormModal(true);
                setIsTaskOpen(false);
              }}
            >
              <Image src={"/edit.svg"} height={15} width={15} alt="edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
