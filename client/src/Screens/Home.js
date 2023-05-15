import React from "react";
import DisplayMsg from "../Components/DisplayMsg";
import TypeMsg from "../Components/TypeMsg";

export default function Home(props) {
  const appendFun = (msg, pos) => {
    props.append(msg, pos);
  };
  return (
    <div>
      <DisplayMsg msg={props.msg} pos={props.pos} appendFun={props.append} />
      <TypeMsg />
    </div>
  );
}
