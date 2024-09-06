import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/hooks/useAuthContext";
import { MdEdit } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../hooks/useLogout";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const token = user?.token;
  const { id } = useParams();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data._id === user.userId) {
          setIsOwner(true);
        }

        setUserDetail(response.data);
        setLoading(false);
        console.log(response.data);

        // Pre-fill the form with user details
        setValue("username", response.data.username);
        setValue("email", response.data.email);
        setValue("bio", response.data.profile.bio);
        setValue("avatar", response.data.profile.avatar);
      } catch (error) {
        setError(error);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, token, setValue, id]);

  // Function to handle bio and avatar update
  const updateProfile = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/user/${id}/profile`,
        {
          bio,
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetail(response.data.data.user);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const userBio =
    userDetail?.profile?.bio || "This user has not provided a bio.";

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: No user found</p>;
  }

  const onSubmit = (data) => {
    console.log("Updated user data:", data);
    // You can make an API call to update user data here
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl font-bold">Profile</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="flex flex-col h-full w-full items-center relative">
        <div className="w-full">
          <img
            className="w-full h-[200px] flex object-cover"
            src="https://plus.unsplash.com/premium_photo-1720202183632-a2f9f47a26d9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="h-[150px] w-[150px] rounded-full absolute top-[calc(15%)] left-[50px] z-10 border-4 border-white">
          <img src="/avatar.png" alt="" className="w-full h-full" />
        </div>
        <div className="flex lg:flex-row h-full w-full md:flex-col sm:flex-col bg-white">
          <div className="flex flex-col lg:w-2/3 pl-[60px] pt-[100px] p-8 md:w-full sm:w-full">
            <div className="flex items-center justify-between mb-[8px] ">
              <h1 className="text-3xl font-semibold">{userDetail.username}</h1>

              {isOwner && (
                <div className="">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1 bg-white rounded-[8px] border-1 border-[#ccc] mr-2">
                        <MdEdit size="20" />
                      </button>
                    </DialogTrigger>
                    <DialogContent
                      style={{ borderRadius: "10px" }}
                      className="bg-white"
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className={"flex items-center justify-center"}>
                        <div className="h-[100px] w-[100px] rounded-full">
                          <img
                            className="w-full h-full"
                            src="/avatar.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <form onSubmit={handleSubmit(updateProfile)}>
                        <div className="mt-4">
                          <label htmlFor="avatar" className="block">
                            Image
                          </label>
                          <Input
                            id="avatar"
                            type="text"
                            className=" w-full border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
                            {...register("avatar")}
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="username" className="block">
                            Username
                          </label>
                          <Input
                            id="username"
                            className=" w-full border border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
                            {...register("username")}
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="email" className="block">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            className=" w-full border border-[#E3E3E3] rounded-[18px] mb-[14px] h-[2.7rem] bg-[#F5F5F5]"
                            {...register("email")}
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="bio" className="block">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            type="text"
                            className="p-3 border border-[#E3E3E3] rounded-[18px] h-[7rem] bg-[#F5F5F5] w-full resize-none overflow-y-auto outline-none"
                            {...register("bio")}
                          />
                        </div>

                        <div className="flex justify-end mt-4">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#B55D51] text-white rounded-md"
                          >
                            Save Changes
                          </button>
                          <DialogTrigger asChild>
                            <button className="px-4 py-2 bg-gray-300 rounded-md ml-2">
                              Cancel
                            </button>
                          </DialogTrigger>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="p-1 bg-white rounded-[8px] border-1 border-[#ccc]">
                        <LuLogOut size="20" />
                      </button>
                    </DialogTrigger>
                    <DialogContent
                      style={{ borderRadius: "10px" }}
                      className="bg-white"
                    >
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription className="bg-white text-1xl font-semibold">
                          Are you sure you want to leave?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 mr-2 bg-[#B55D51] text-white rounded-md"
                        >
                          Leave
                        </button>
                        <DialogTrigger asChild>
                          <button className="px-4 py-2 bg-gray-300 rounded-md">
                            Stay
                          </button>
                        </DialogTrigger>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            <h1 className="text-1xl font-medium mb-2">{userDetail.email}</h1>
            <p>{userBio}</p>
            <div className="h-1/3 w-full flex mt-20 rounded-[10px] border-1 bg-white">
              <div className="w-1/2 flex flex-col items-center pt-5 border-r-[1px]">
                <p className="text-[20px] font-bold mb-5">Total Recipes</p>
                <p className="text-2xl font-medium">10</p>
              </div>
              <div className="w-1/2 flex flex-col items-center pt-5 border-l-[1px]">
                <p className="text-[20px] font-bold mb-5">Total Favorites</p>
                <p className="text-2xl font-medium">10</p>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-blue-200">
            <div className="p-4">
              <h1>recipes</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
