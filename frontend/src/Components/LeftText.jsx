import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5001");

export default function LeftText(props) {
  // const [data, setData] = useState({ msg: "", name: "", pos: "" });

  // const append = (msg, name, pos) => {
  //   setData({ msg: msg, name: name, pos: pos });
  // };

  // useEffect(() => {
  //   socket.on("receive", (data) => {
  //     append(`${data.msg}`, `${data.name}`, `left`);
  //     // setState({data.msg, })
  //   });
  // }, [socket]);

  return (
    <div className="msg left">
      <h1>{props.name}</h1>
      <p>{props.msg}</p>
    </div>
  );
}
