import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { IoIosVideocam } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async() =>{
    localStorage.clear();
    window.location.reload();
    // navigate('/')
}
  const handleVideoCall = async() => {
    window.location.href = "https://video-call-steel.vercel.app";
  }
  
  return (
    <>
      <Button onClick={handleVideoCall}>
        <IoIosVideocam />
      </Button>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: ;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
