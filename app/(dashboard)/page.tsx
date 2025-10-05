"use client";
import Image from "next/image";
import TaskCard from "../components/TaskCard";
import PieChart from "../components/PieChart";
import FormModal from "../components/FormModal";
import { useTasks } from "@/context/TasksContext";

import {  useState } from "react";

export default function Home() {
  const [isFormModal, setIsFormModal] = useState(false)
  
  const {tasks,completedTasks ,inProgressTasks,notStartedTasks} = useTasks() 
  
  
  const [modalData, setModalData] = useState({
    modalId:"",
    modalDescription:"",
    modalTitle:"",
    modalStatus:"Not Started",
    modalPriority:"Extreme",
    modalAttachment:{url:"",
      public_id:""
    },
    type:"add"
  })
  
  
  return (
  
  
      <div className="     ">
        {isFormModal && (
          <FormModal
            setModelData={setModalData}
            setIsFormModal={setIsFormModal}
            {...modalData}
          />
        )}

        <div className="flex flex-col  lg:flex-row gap-10 rounded-md  m-5 ">
          {/* left */}
          <div className="w-full  lg:w-1/2 flex flex-col gap-2 bg-white p-5 shadow-xl/30 rounded-lg">
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
            <p className="">
              {new Date().toDateString().split(" ").slice(1, 3).join(" ")}{" "}
              <span className="mx-2 text-gray-400">•Today</span>
            </p>
            <div className="  flex flex-col gap-5 justify-center ">
              {tasks.length === 0 ? (
                <h1 className="text-center text-gray-400">
                  No Tasks Available Yet
                </h1>
              ) : (
                tasks
                  ?.slice(0, 3)
                  .map((task) => (
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
          {/* right */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-between    ">
            <div className="shadow-xl bg-white flex flex-col  gap-2 p-5  rounded-lg">
              <div className="flex gap-3 items-center">
                <Image src="/doneTask.svg" alt="logo" width={22} height={22} />
                <h2 className=" text-[#FF6767]">Completed Tasks</h2>
              </div>
              <div className="flex flex-col sm:flex-row justify-between h-full">
                <PieChart
                  type="Completed"
                  totalTasks={tasks.length}
                  tasks={completedTasks.length}
                  color="#05A301"
                />
                <PieChart
                  type="In Progress"
                  color="#0225FF"
                  totalTasks={tasks.length}
                  tasks={inProgressTasks.length}
                />
                <PieChart
                  type="Not Started"
                  totalTasks={tasks.length}
                  tasks={notStartedTasks.length}
                  color="#F21E1E"
                />
              </div>
            </div>
            {/* Completed Tasks */}
            <div className="shadow-xl/30 bg-white flex flex-col gap-2 p-5 rounded-lg h-full">
              <div className="flex gap-3 items-center">
                <Image src="/doneTask.svg" alt="logo" width={22} height={22} />
                <h2 className=" text-[#FF6767]">Completed Tasks</h2>
              </div>
              <div className="  flex flex-col gap-5 justify-center  ">
                {completedTasks.length === 0 ? (
                  <h1 className="text-center  text-gray-400">
                    No Completed Tasks Yet
                  </h1>
                ) : (
                  completedTasks
                    ?.slice(0, 2)
                    .map((task) => (
                      <TaskCard
                        setIsModelOpen={setIsFormModal}
                        setModelData={setModalData}
                        key={task.id ?? ""}
                        {...task}
                        attachment={
                          task.attachment ?? { url: "", public_id: "" }
                        }
                      />
                    ))
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )}
