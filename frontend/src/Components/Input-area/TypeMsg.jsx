import React, { useState } from "react";
import "./typeMsg.css";

import socket from "../socket";

export default function TypeMsg(props) {
  const [inpText, setInpText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading

    // Storing input value
    const inp = document.getElementById("msgInp").value;

    // Emitting event when user sends the message
    socket.emit("sendMsg", { inp, name: props.name });

    // Sending data to the parent element i.e., App.jsx
    props.appendFun(`${props.name}`, `${inp}`, `right`, true);

    setInpText(""); //clears out the input area
  };

  return (
    <form action="#" id="sendMsgForm" onSubmit={handleOnSubmit}>
      <input
        type="text"
        id="msgInp"
        placeholder="Type a message...."
        onChange={(e) => setInpText(e.target.value)}
        value={inpText}
      />
      <button className="btn" type="submit">
        <i className="fa-regular fa-paper-plane"></i>
      </button>
    </form>
  );
}
