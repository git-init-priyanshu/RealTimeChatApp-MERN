import React, { useState } from "react";
import MsgContext from "./MsgContext";

export default function MsgState(props) {
  const [msgArr, setMsgArr] = useState([]);

  return (
    <MsgContext.Provider value={msgArr}>{props.children}</MsgContext.Provider>
  );
}
