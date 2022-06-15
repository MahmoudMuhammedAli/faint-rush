import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Faint() {
  const user = useSelector((state) => state.user);
  const date = new Date();
  const navigate = useNavigate();

  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
   const accessINFO=()=>{
     navigate("/info")
   }
   const  goHOME=()=>{
    if(user.type=="patient")
    {navigate("/patienthome") }
    else{navigate("/caretaker")}  }
// do reset
    const reset=()=>{}
  return (
    <div className="flex flex-col items-center ">
      <div className=" pt-8  pb-6 h-screen font-mon flex flex-col items-center max-w-md w-full bg-[#F75010]">
        <span className="block text-white font-bold font[Helvetica] text-[40px]">
          FAINT DETECTED!
        </span>
        <span className=" pt-5 block text-white font-bold font[Helvetica] text-[23px]">
          Mahmoud fainted on: {showTime}
        </span>
       

        <div className=" ml-6 pt-16 pb-4  flex flex-col items-start gap-2 ">
          <span className=" block pb-2 text-white font-bold font[Helvetica] text-[40px]">
            Act Quickly
          </span>

          <span className=" text-left text-white font-bold font[Helvetica] text-[23px]">
            -Call an Ambulance 911
          </span>
         
          <span className="text-left text-white font-bold font[Helvetica] text-[23px]">
            -Notify the rest of the emergency list
          </span>
          <span className="text-left hover:bg-slate-50 text-white font-bold font[Helvetica] text-[23px]" onClick={accessINFO}>
            - Access Patient's medical history
          </span>
        </div>
        <div className="flex flex-row gap-5">
        
          <button className="w-24 h-10 rounded-2xl bg-red-900  text-black font-bold font-mon" onClick={goHOME}>
            Cancel
          </button>
        
        {user.type == "patient" && (
          <button className="w-24 h-10 rounded-2xl bg-red-900  text-black font-bold font-mon" onClick={reset}>
            Reset
          </button>
              )}
        </div>
      </div>
    </div>
  );
}
