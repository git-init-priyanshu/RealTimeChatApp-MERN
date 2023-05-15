import React from "react";
import MsgContext from "./MsgContext";

export default function MsgState(props) {
  return <MsgContext.Provider>{props.children}</MsgContext.Provider>;
}
