import "./App.css";
import Home from "./Screens/Home";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5001");

function App() {
  const [userName, setUserName] = useState("");

  const [msg, setMsg] = useState("");
  const [pos, setPos] = useState("");

  const append = (msg, position) => {
    console.log(msg, position);
    setMsg(msg);
    setPos(position);
    // console.log(msg, position);
  };

  useEffect(() => {
    const userName = prompt("Enter your name to join the chat");
    setUserName(userName);
    console.log(userName);
    if (userName) {
      // setUserName(userName);
      socket.emit("new-user-joined", userName);

      socket.on("user-joined", (name) => {
        append(`${name} joined the chat`, `center`);
      });

      socket.on("receive", (data) => {
        append(`${data.msg}:${data.user}`, `left`);
      });
    }
  }, []);

  return <Home msg={msg} pos={pos} append={append} />;
}

export default App;
