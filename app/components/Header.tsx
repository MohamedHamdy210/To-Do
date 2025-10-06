"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Header = () => {
  const [search, setSearch] = useState("")
  const router=  useRouter()
  const handleSearch=()=>{
    router.push(`/search/${search}`)
    setSearch("")
  }
  return (
    <div className="w-full  px-4 py-2 shadow-xl flex items-center justify-between ">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold select-none ">
          {" "}
          <span className="text-[#FF6767]">To-</span>
          <span>Do</span>{" "}
        </h1>
      </Link>
      <div className="flex items-center w-1/2 md:w-1/3 shadow-2xl bg-white rounded-md">
        <input
        value={search}
          type="text"
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          placeholder="Search your task here"
          className=" h-[32px]   w-full px-2 focus:outline-none rounded-l-md"
        />
        <button className="bg-[#ff6767] p-2 cursor-pointer rounded-md "
        onClick={handleSearch}
      
        >
          <Image src="/search.svg" alt="search" width={16} height={16} />
        </button>
      </div>
      <div className="hidden md:flex md:flex-col items-center ">
        <span>
          {new Date().toLocaleDateString("en-GB", { weekday: "long" })}
        </span>
        <span className='text-[#3ABEFF]'>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
    </div>
  );
}

export default Header