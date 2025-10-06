"use client"
import { useAuth } from "@/context/AuthContext";
import { addTask, updateTask } from "@/lib/tasks";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

const FormModal = ({
  setIsFormModal,
  modalTitle,
  modalPriority,
  modalDescription,
  modalStatus,
  modalAttachment,
  modalId,
  type,
  setModelData,
}: {
  setIsFormModal: Dispatch<SetStateAction<boolean>>;
  modalTitle: string;
  modalPriority: string;
  modalDescription: string;
  modalStatus: string;
  modalAttachment: {url:string
    , public_id:string
  };
  modalId: string;
  type: string;
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
}) => {
  const [title, setTitle] = useState(modalTitle);
  const [status, setStatus] = useState(modalStatus);
  const [priority, setpriority] = useState(modalPriority);
  const [desc, setDesc] = useState(modalDescription);
  const [attachment, setAttachment] = useState(modalAttachment);
  const { user } = useAuth();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    

    // Save this URL in your Firestore when adding a task
    setAttachment({ url: data.secure_url, public_id: data.public_id });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid) {
      // Handle the case where uid is undefined, e.g., show an error or return early
      alert("User is not authenticated.");
      return;
    }
    if (type === "add") {
      addTask(user.uid, title, desc, priority, status, attachment);
    } else if (type === "edit") {
      updateTask({
        id: modalId,
        title,
        description: desc,
        priority,
        status,
        attachment,
        uid: "",
      });
    }
    setModelData({
      modalId: "",
      modalDescription: "",
      modalTitle: "",
      modalStatus: "Not Started",
      modalPriority: "Extreme",
      modalAttachment: {
        url:"",
        public_id:""
      },
      type: "add",
    });
    setIsFormModal(false);
  };

  return (
    <div
      className="w-screen h-screen absolute left-0 top-0 bg-black/60  z-50 flex items-center justify-center"
      onClick={() => {
        setModelData({
          modalId: "",
          modalDescription: "",
          modalTitle: "",
          modalStatus: "Not Started",
          modalPriority: "Extreme",
          modalAttachment: {url:"",
            public_id:""
          },
          type: "add",
        });
        setIsFormModal(false);
      }}
    >
      <div
        className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] text-xs md:text-base overflow-auto max-h-[82dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cursor-pointer absolute right-4 top-4 ">
          <Image
            alt=""
            src="/close.png"
            width={14}
            height={14}
            onClick={() => {
              setModelData({
                modalId: "",
                modalDescription: "",
                modalTitle: "",
                modalStatus: "Not Started",
                modalPriority: "Extreme",
                modalAttachment: {
                  url: "",
                  public_id: "",
                },
                type: "add",
              });
              setIsFormModal(false);
            }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 underline decoration-[#FF6767] dec">
            Add New Task
          </h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="border border-gray-300 p-2">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-[60%]">
                  <div className="flex flex-col gap-2 my-1 ">
                    <label htmlFor="title" className="font-semibold">
                      Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      name="title"
                      id="title"
                      className=" border border-gray-300  w-full focus:border-gray-500 outline-none p-1 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="status" className="font-semibold">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      name="status"
                      id="status"
                      className="border border-gray-300  w-full focus:border-gray-500 outline-none p-1 rounded-lg"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="py-2 w-full">
                    <label className="font-semibold">Priority</label>
                    <div className="flex gap-3">
                      <label
                        htmlFor="Extreme"
                        className="flex  gap-2 items-center justify-center font-semibold"
                      >
                        {" "}
                        <span className="text-[#F21E1E] font-bold text-xl mx-0.5">
                          •
                        </span>{" "}
                        <span>Extreme</span>
                        <input
                          checked={priority === "Extreme"}
                          value={"Extreme"}
                          onChange={(e) => {
                            setpriority(e.target.value);
                          }}
                          type="radio"
                          name="priority"
                          id="Extreme"
                          className="mt-1 rounded-lg"
                          style={{
                            accentColor: "#F21E1E",
                          }}
                        />
                      </label>
                      <label
                        htmlFor="Moderate"
                        className="flex  gap-2 items-center justify-center font-semibold"
                      >
                        {" "}
                        <span className="text-[#3abeff] font-bold text-xl mx-0.5">
                          •
                        </span>{" "}
                        <span>Moderate</span>
                        <input
                          checked={priority === "Moderate"}
                          value={"Moderate"}
                          onChange={(e) => {
                            setpriority(e.target.value);
                          }}
                          type="radio"
                          name="priority"
                          id="Moderate"
                          className="mt-1 rounded-lg"
                          style={{
                            accentColor: "#3abeff",
                          }}
                        />
                      </label>
                      <label
                        htmlFor="Low"
                        className="flex  gap-2 items-center justify-center font-semibold"
                      >
                        {" "}
                        <span className="text-[#05a301] font-bold text-xl mx-0.5">
                          •
                        </span>{" "}
                        <span>Low</span>
                        <input
                          checked={priority === "Low"}
                          value={"Low"}
                          onChange={(e) => {
                            setpriority(e.target.value);
                          }}
                          type="radio"
                          name="priority"
                          id="Low"
                          className="mt-1 rounded-lg"
                          style={{
                            accentColor: "#05a301",
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label className="font-semibold" htmlFor="desc">
                      Task Description
                    </label>
                    <textarea
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      draggable={true}
                      name="desc"
                      id="desc"
                      className="resize-none border border-gray-300  w-full focus:border-gray-500 outline-none p-1w-full h-[15rem] rounded-lg"
                    />
                  </div>
                </div>
                <div className=" md:w-[40%]">
                  <div className="flex flex-col justify-end h-full items-center gap-2 w-full">
                    <label className="font-semibold capitalize self-start mx-6">
                      upload Image
                    </label>
                    <div className="min-h-[15rem] w-full border  p-3 border-gray-300 rounded-lg">
                      <label
                        htmlFor="image"
                        className="h-full flex justify-center items-center"
                      >
                        <Image
                          alt=""
                          src={
                            attachment.url.length === 0
                              ? "/placeholder.svg"
                              : attachment.url
                          }
                          width={150}
                          height={150}
                          className="cursor-pointer w-full  rounded-lg "
                        />
                        <input
                          type="file"
                          name=""
                          id="image"
                          className="hidden"
                          multiple={false}
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files?.length > 1) {
                              alert("Please Select One pic");
                              e.target.value = "";
                            }
                            handleImageUpload(e);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#f24e1e] cursor-pointer hover:bg-[#f00] transition-colors text-white p-2 rounded-lg"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
