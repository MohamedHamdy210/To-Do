// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signUpWithEmail } from "@/lib/auth";
import Image from "next/image";

export default function Page() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {user}=useAuth()
  if (user) {
  router.push("/"); // already logged in → redirect
}
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(
        email,
        password,
        fName.toString() + " " + lName.toString()
      );

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-screen w-screen relative flex justify-center lg:justify-end bg-[url('/signbg.png')] bg-center bg-cover bg-">
      <div className="  md:w-[40%] p-8 space-y-6 self-center md:mx-10 ">
        <h2 className="font-serif">Sign IN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border rounded-lg flex items-center p-3">
            <Image
              src="/firstName.svg"
              alt="Email Icon"
              width={24}
              height={24}
              className=""
            />
            <input
              type="text"
              placeholder="Enter First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="w-full px-3 py-2    active:outline-none focus:outline-none"
              required
            />
          </div>
          <div className="border rounded-lg flex items-center p-3">
            <Image
              src="/lastName.svg"
              alt="Email Icon"
              width={24}
              height={24}
              className=""
            />

            <input
              type="text"
              placeholder="Enter Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="w-full px-3 py-2   active:outline-none focus:outline-none"
              required
            />
          </div>
          
          <div className="border rounded-lg flex items-center p-3">
            <Image
              src="/email.svg"
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
              className="w-full px-3 py-2   active:outline-none focus:outline-none"
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
          <div className="flex gap-4">
            <input type="checkbox" name="check" id="check" required />
            <label htmlFor="check">I agree all terms</label>
          </div>
          <button
            type="submit"
            className="w-1/2 bg-[#FF9090] text-white py-4 rounded hover:bg-[#FF7070]"
          >
            Register
          </button>
        </form>
        
        <div className="">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-5 left-0 ">
        <Image
          src="/signup.png"
          alt="signup Illustration"
          width={400}
          height={400}
          className=" "
        />
      </div>
    </div>
  );
}
