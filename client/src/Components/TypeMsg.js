import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export default function TypeMsg(props) {
  const [inpText, setInpText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const msgInp = document.getElementById("msgInp");

    // Whenever user types a msg and sends it then emit this event
    socket.emit("sendMsg", msgInp.value);
    props.appendFun(`You: ${msgInp.value}`, `right`);

    setInpText("");
  };
  return (
    // <div className="containerInp">
    <form action="#" id="sendMsgForm" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="msgInp"
        id="msgInp"
        placeholder="Type a message...."
        onChange={(e) => setInpText(e.target.value)}
        value={inpText}
      />
      <button className="btn" type="submit">
        <i class="fa-regular fa-paper-plane"></i>
      </button>
    </form>
    // </div>
  );
}
