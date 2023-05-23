import React from "react";

import RightText from "./components/RightText";
import LeftText from "./components/LeftText";
import CenterText from "./components/CenterText";

import "./displayMsg.css";

export default function DisplayMsg({ msgArr, name }) {
  return (
    <div className="container">
      {msgArr.map((item) => {
        // let position = "";
        console.log(item);
        if (item.name === name && item.position === "center") {
          return <CenterText msg={"You joined the chat"} key={item._id} />;
        } else if (item.name !== name && item.position === "center") {
          return <CenterText msg={item.msg} key={item._id} />;
        } else if (item.name === name) {
          return <RightText msg={item.msg} key={item._id} />;
        } else if (item.name !== name) {
          return <LeftText msg={item.msg} name={item.name} key={item._id} />;
        }
      })}
    </div>
  );
}
