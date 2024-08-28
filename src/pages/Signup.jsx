import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Lock } from "lucide-react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { signUp, isLoading, error } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signUp(user, email, password, confirmPassword);
    setEmail("");
    setUser("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      style={{ backgroundImage: "url('./bg2.jpeg')" }}
      className=" bg-center bg-cover h-[100vh] w-[100vw] justify-center flex items-center border"
    >
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-5xl font-bold">Signup</h1>
        <p>Welcome! Enjoy endless recipes at your fingertips.</p>

        {/* Login form */}
        <div
          style={{ boxShadow: "0px 0px 36.9px 6px rgba(0, 0, 0, 0.25)" }}
          className="flex flex-col gap-4 h-[610px] bg-[#fefefe] w-[450px] rounded-3xl border justify-center items-center  px-12"
        >
          <div className="flex flex-col gap-3 w-full mt-[40px]">
            {/* User input */}
            <div className="relative h-10 w-full mb-3 text-[#A4A4A4]">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <Input
                type="text"
                placeholder="user name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="pl-10 py-3 pr-4 border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
              />
            </div>

            {/* Email input */}
            <div className="relative h-10 w-full mb-3 text-[#A4A4A4]">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-3 pr-4 border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
              />
            </div>

            {/* Password input */}
            <div className="relative h-10 w-full mb-3 text-[#A4A4A4]">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="pl-10 py-3 pr-4 border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
              />
            </div>

            {/* Confirm Password input */}
            <div className="relative h-10 w-full mb-3 text-[#A4A4A4]">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                className="pl-10 py-3 pr-4 border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
              />
            </div>

            {/* Signup button */}
            <Button
              disabled={isLoading}
              onClick={handleSignup}
              className="p-3 rounded-[18px] h-42 bg-[#B55D51] text-white hover:bg-[#9b4b44]"
            >
              Sign up
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Divider and social login */}
          <div className="w-full flex items-center mt-4 ">
            <hr className="flex-grow border-[#D9D9D9]" />
            <span className="px-2 whitespace-nowrap text-[#868686]">
              Sign with
            </span>
            <hr className="flex-grow border-[#D9D9D9]" />
          </div>

          {/* Social login buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button className=" text-white rounded-full p-0 w-10 h-10 flex items-center justify-center bg-white hover:bg-white drop-shadow-md">
              <img src="./google.png" alt="" className="w-8 h-8" />
            </Button>
            <Button className="rounded-full w-10 p-0 h-10 flex items-center justify-center bg-white hover:bg-white drop-shadow-md">
              <img src="./facebook1.png" alt="" className="w-8 h-8 " />
            </Button>
          </div>

          {/* Sign up link */}
          <p className="mt-4 text-[#868686]">
            Already have an account?{" "}
            <span className="text-[#B55D51]">
              <a href="/login">login</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
