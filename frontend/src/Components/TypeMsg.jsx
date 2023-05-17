import React, { useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export default function TypeMsg(props) {
  const ref = useRef();

  const [inpText, setInpText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const inp = ref.current.value;
    console.log(inp);

    // Whenever user types a msg and sends it then emit this event
    socket.emit("sendMsg", inp);
    props.appendFun(`You: ${inp}`, `right`);

    setInpText(""); //clears out the input area
  };
  return (
    <form action="#" id="sendMsgForm" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="msgInp"
        id="msgInp"
        ref={ref}
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
