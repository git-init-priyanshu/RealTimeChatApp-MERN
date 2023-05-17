import React, { useEffect, useState } from "react";
import RightText from "./RightText";
import LeftText from "./LeftText";
import CenterText from "./CenterText";

export default function DisplayMsg({ msgArr }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => {
      return prevKey++;
    });
  }, []);

  return (
    <div className="container">
      {msgArr.map((item) => {
        if (item.position === "right") {
          return <RightText key={key} msg={item.msg} />;
        } else if (item.position === "left") {
          return <LeftText key={key} msg={item.msg} />;
        } else if (item.position === "center") {
          return <CenterText key={key} msg={item.msg} />;
        }
      })}
    </div>
  );
}
