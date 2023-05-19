import React from "react";
import "./displayMsg.css";
import RightText from "./components/RightText";
import LeftText from "./components/LeftText";
import CenterText from "./components/CenterText";

export default function DisplayMsg({ msgArr }) {
  return (
    <div className="container">
      {msgArr.map((item) => {
        if (item.position === "right") {
          return <RightText msg={item.msg} />;
        } else if (item.position === "left") {
          return <LeftText msg={item.msg} name={item.name} />;
        } else if (item.position === "center") {
          return <CenterText msg={item.msg} />;
        }
      })}
    </div>
  );
}
