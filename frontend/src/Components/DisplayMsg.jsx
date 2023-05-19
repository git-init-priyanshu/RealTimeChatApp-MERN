import React, { useEffect, useState } from "react";
import RightText from "./RightText";
import LeftText from "./LeftText";
import CenterText from "./CenterText";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export default function DisplayMsg({ msgArr, name }) {
  // useEffect(() => {
  //   socket.on("receive" , (data)=>{

  //   })
  // }, []);

  return (
    <div className="container">
      {msgArr.map((item) => {
        if (item.position === "right") {
          return <RightText msg={item.msg} />;
        } else if (item.position === "left") {
          return <LeftText msg={item.msg} name={name} />;
        } else if (item.position === "center") {
          return <CenterText msg={item.msg} />;
        }
      })}
    </div>
  );
}
