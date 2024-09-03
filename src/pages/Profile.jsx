import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Mail, User, Lock } from "lucide-react";
import axios from "axios";
import { useAuthContext } from "@/hooks/useAuthContext";
import { set } from "date-fns";

const Profile = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const token = user?.token;

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetail(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="w-full ">
        <h1 className="text-3xl font-bold">Profile</h1>
        <hr className="h-[2px] border border-stone-200 mt-[20px] mb-[20px]" />
      </div>
      <div className="flex flex-col border h-full w-full items-center relative">
        <div className=" w-full">
          <img
            className="w-full h-[200px] flex object-cover"
            src="https://plus.unsplash.com/premium_photo-1720202183632-a2f9f47a26d9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="h-[150px] w-[150px] rounded-full absolute top-[calc(15%)] left-[50px] z-10 border-4 border-white">
          <img src="/avatar.png" alt="" className="w-full h-full" />
        </div>
        <div className="flex lg:flex-row h-full w-full border md:flex-col sm:flex-col">
          <div className="flex flex-col lg:w-2/3 pl-[60px] pt-[100px] p-5 md:w-full sm:w-full">
            <h1 className="text-3xl font-semibold">{userDetail.username}</h1>
            <h1 className="text-1xl font-medium mb-2">{userDetail.email}</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              sed quis ea dolorem cumque cum nobis et vel labore explicabo
              nesciunt reprehenderit, mollitia voluptate, aperiam numquam
              similique porro officia, quisquam consequatur! Eligendi a quasi
              eius, pariatur, debitis repellendus sint ex quas suscipit iste
              laborum laudantium ipsam obcaecati accusamus corporis ratione?
            </p>
            <div className="h-1/3 w-full flex mt-14 rounded-[10px] border-3 ">
              <div className="w-1/2 flex flex-col items-center pt-5">
                <p className="text-[20px] font-bold mb-5">Total Recipes</p>
                <p className="text-2xl  font-medium">10</p>
              </div>
              <div className="w-1/2 flex flex-col items-center pt-5 border-l-3 border">
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
