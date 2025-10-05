"use client";
import FormModal from "@/app/components/FormModal";
import TaskCard from "@/app/components/TaskCard";


import { useTasks } from "@/context/TasksContext";
import Image from "next/image";
import { use, useState } from "react";

const Page = ({ params }: { params: Promise<{ searchParam: string }> }) => {
  const {tasks}=useTasks()
  const  searchParam  = decodeURIComponent(use(params).searchParam).toLowerCase().trim();
  
  const filterdTasks = tasks.filter(
    (task) =>
      task.title.trim().toLowerCase().includes(searchParam) ||
      task.description.trim().toLowerCase().includes(searchParam)
  );
  const [isFormModal, setIsFormModal] = useState(false);
  const [modalData, setModalData] = useState({
    modalId: "",
    modalDescription: "",
    modalTitle: "",
    modalStatus: "Not Started",
    modalPriority: "Extreme",
    modalAttachment: { url: "", public_id: "" },
    type: "add",
  });

  return (
    <div className="p-5 bg-white shadow-2xl rounded-lg m-5 flex flex-col gap-2 h-full">
      {isFormModal && (
        <FormModal
          setModelData={setModalData}
          setIsFormModal={setIsFormModal}
          {...modalData}
        />
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/Pending.svg" alt="logo" width={30} height={30} />
          <h2 className=" text-[#FF6767]">TO-DO</h2>
        </div>
        <button
          className="cursor-pointer text-[#ff6767] hover:bg-[#ff6767] hover:text-white transition-colors rounded-md flex items-baseline  p-1"
          onClick={() => setIsFormModal(true)}
        >
          {" "}
          <span className=" text-2xl">+</span>{" "}
          <span className="text-lg ">Add Task</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
        {filterdTasks?.length === 0 ? (
          <h1 className="text-2xl place-self-center  col-span-full text-gray-500">
            No Tasks Contains {searchParam} Yet
          </h1>
        ) : (
          filterdTasks?.map((task) => (
            <TaskCard
              setIsModelOpen={setIsFormModal}
              setModelData={setModalData}
              key={task.id ?? ""}
              {...task}
              attachment={task.attachment ?? { url: "", public_id: "" }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
