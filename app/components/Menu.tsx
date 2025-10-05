"use client";
const menuItems = [
  {
    icon: "/logo.svg",
    activeIcon: "/logoActive.svg",
    label: "Dashboard",
    href: "/",
  },
  {
    icon: "/allTasks.svg",
    activeIcon: "/allTasksActive.svg",
    label: "To-Do List",
    href: "/todolist",
  },
  {
    icon: "/today.svg",
    activeIcon: "/todayActive.svg",
    label: "Today Tasks",
    href: "/todaytasks",
  },
    {
    icon: "/zap.svg",
    activeIcon: "/zapActive.svg",
    label: "Important Tasks",
    href: "/importanttasks",
  },
  {
    icon: "/inproggress.svg",
    activeIcon: "/inproggressActive.svg",
    label: "In-progress Tasks",
    href: "/inprogresstasks",
  },
  {
    icon: "/done.svg",
    activeIcon: "/doneActive.svg",
    label: "Completed Tasks",
    href: "/completedtasks",
  },
];

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Menu = () => {
  const pathName= usePathname();
  const { user } = useAuth()
  return (
    <div className=" text-sm flex flex-col relative h-full  py-10 md:py-5 lg:rounded-t-md bg-black ">
      <div className="hidden  lg:-translate-y-15 lg:flex lg:flex-col  items-center  text-white gap-1 ">
        <Image
          src={user?.photoURL?.toString() || "/person.svg"}
          alt="menuTop"
          width={90}
          height={90}
          className="mx-auto mb-5 rounded-full bg-white"
        />
        <h1 className="capitalize font-semibold">{user?.displayName}</h1>
        <h2>
          { user?.email &&user?.email.length > 20
            ? user?.email?.substring(0, 20) + "..."
            : user?.email}
        </h2>
      </div>
      <div className="flex flex-col  gap-2  md:px-2 lg:-translate-y-10 ">
        {menuItems.map((i) => (
          <Link
            
            key={i.label}
            href={i.href}
            className={`flex items-center justify-center lg:justify-start gap-4 ${
              pathName === i.href ? "bg-white text-[#FF6767]" : "text-white"
            } py-3  rounded-sm hover:bg-gray-500 md:px-1 `}
          >
            <Image
              alt=""
              src={pathName === i.href ? i.activeIcon : i.icon}
              width={18}
              height={18}
            />
            <span className="hidden lg:block">{i.label}</span>
          </Link>
        ))}
      </div>
      <button
        onClick={() => {
          if (auth) {
            signOut(auth);
          }
        }}
        
        className={`flex items-center cursor-pointer justify-center lg:justify-start gap-4 text-white
         py-3  rounded-sm hover:bg-gray-500 md:px-1 absolute bottom-10 w-full`}
      >
        <Image src={"/logout.svg"} alt="logout" width={18} height={18} />
        <span className="hidden lg:block">Log Out</span>
      </button>
    </div>
  );
};

export default Menu;
