// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signInWithEmail, } from "@/lib/auth";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/"); // already logged in → redirect
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
       await signInWithEmail(email, password);
       router.push("/");
     } catch (err: unknown) {
       if (err instanceof Error) {
         alert(err.message);
       } else {
         alert("An unexpected error occurred.");
       }
     }  };

  return (
    <div className="h-screen w-screen relative flex justify-center lg:justify-start bg-[url('/signbg.png')] bg-center bg-cover ">
      <div className="  md:w-[40%] p-8 space-y-6 self-center md:mx-5 ">
        <h2 className="font-serif">Sign IN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border rounded-lg flex items-center p-3">
            <Image
              src="/person.svg"
              alt="Email Icon"
              width={24}
              height={24}
              className=""
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2    active:outline-none focus:outline-none"
              required
            />
          </div>
          <div className="border rounded-lg flex items-center p-3">
            <Image
              src="/password.svg"
              alt="Email Icon"
              width={24}
              height={24}
              className=""
            />

            <input
              type={isPasswordShown?"text":"password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2   active:outline-none focus:outline-none"
              required
            />
            <Image src={isPasswordShown?"/eye-closed.svg":"/eye.svg"} alt="" width={20} height={20} className="cursor-pointer"
            onClick={()=>setIsPasswordShown(prev=>!prev)}
            />
          </div>
          <button
            type="submit"
            className="w-1/2 bg-[#FF9090] text-white py-4 rounded hover:bg-[#FF7070]"
          >
            Login
          </button>
        </form>
        <div className="flex gap-4 items-center">
          Or Continue With:{" "}
          <button onClick={signInWithGoogle} className="cursor-pointer">
            <Image src="/google.svg" alt="google icon" width={30} height={50} />
          </button>{" "}
        </div>
        <div className="">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Create One
          </a>
        </div>
      </div>
      <div className="hidden lg:block absolute top-18 right-20 ">
        <Image
          src="/signin.png"
          alt="Login Illustration"
          width={650}
          height={650}
          className="opacity-75"
        />
      </div>
    </div>
  );
}
