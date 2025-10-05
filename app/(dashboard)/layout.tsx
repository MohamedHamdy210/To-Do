"use client";


import Menu from "../components/Menu";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";
import { TaskProvider } from "@/context/TasksContext";
import Header from "../components/Header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if no user
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-[#ff6767] animate-ping font-bold text-3xl">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return null; // don’t render dashboard content while redirecting
  }
  
  
  return (
    <div className="h-screen  w-screen bg-[#F5F8FF] grid grid-rows-10  gap-0">
      <header className=" w-full bg-[#F5F8FF]  ">
        <Header />
      </header>
      {/* left */}
      <div className="flex w-screen  row-span-9  ">
        <div className=" lg:pt-9  w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-0 m-0 ">
          <Menu />
        </div>
        {/* right */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]    flex flex-col overflow-auto">
          <TaskProvider>
            <h1 className=" text-2xl md:text-4xl font-semibold mx-5  capitalize">
              Welcome Back, {user?.displayName} &#128075;
            </h1>
            {children}
          </TaskProvider>
        </div>
      </div>
    </div>
  );
}
