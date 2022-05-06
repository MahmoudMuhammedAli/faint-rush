import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import Header from "./Header";
import Logo from "../../components/SVG/Logo";
import {useLocation} from 'react-router-dom';
import axios from 'axios';

import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { setEmail,setPassword, setUsername,setValid,setItemName,setItemRlation,setItemPhone,setPhone } from "../../redux/userSlice"




export default function GetStarted() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const location = useLocation();
  

  const navigate = useNavigate();
  
  const navigateToPatientHome = (e) => {
    e.preventDefault();
    const article = { name:user.username, email:user.email ,password:user.password , phone:user.phone , type:user.type, list:user.list};
    axios.put('http://localhost:8080/signupdata/', article)
    
    
    
    navigate("/patienthome");
  };
  
  
  return (
    
     <>
      <div className="pt-10 h-screen flex flex-col items-center">
        <Logo/>
        <Header />
        <h2>{user.list[location.state.id-1].relation}</h2>

      <form
        onSubmit={(e) => {
          navigateToPatientHome(e);
        }}
        className=" flex justify-center  flex-col    m-4"
      >
        <div>
        
          <input
            required
            className=" border-4 mb-3  justify-center text-center placeholder:italic placeholder:text-slate-400 block w-80 h-14 drop-shadow-md rounded-2xl"
            type="text"
            id="relation_edit"
            value={user.list[location.state.id-1].relation}
            onChange={(e) => dispatch(setItemRlation({id:location.state.id,relation:e.target.value}))}
            name="relation"
            placeholder="Enter the relation"
          />
           <input
            required
            className=" border-4 mb-3 justify-center text-center placeholder:italic placeholder:text-slate-400 block w-80 h-14 drop-shadow-md rounded-2xl"
            type="text"
            name="name"
            value={user.list[location.state.id-1].name}
            onChange={(e) => dispatch(setItemName({id:location.state.id,name:e.target.value}))}
            placeholder="Enter name"
          />
           <input
            required
            className="border-4 mb-3 justify-center text-center placeholder:italic placeholder:text-slate-400 block w-80 h-14 drop-shadow-md rounded-2xl"
            type="number"
            name="phone"
            value={user.list[location.state.id-1].phone}
            onChange={(e) => dispatch(setItemPhone({id:location.state.id,phone:e.target.value}))}

            placeholder="Enter phone"
          />
          
        </div>

        <Button text="Done" />
      </form>

      </div>


    </>
    
  );
}
