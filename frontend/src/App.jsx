import { useContext, useEffect, useState } from "react";
import DisplayMsg from "./Components/DisplayMsg";
import TypeMsg from "./Components/TypeMsg";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function App() {
  const [name, setName] = useState("");

  const [msgArr, setMsgArr] = useState([]);

  const append = (msg, position) => {
    setMsgArr((currentArr) => {
      return [...currentArr, { msg, position }];
    });
  };

  useEffect(() => {
    const userName = prompt("Enter your name to join the chat");
    setName(userName);

    if (userName) {
      socket.emit("new-user-joined", userName);

      socket.on("user-joined", (name) => {
        append(`${name} joined the chat`, `center`);
      });

      socket.on("receive", (data) => {
        if (data.name !== userName) {
          append(`${data.msg}`, `left`);
          console.log("append");
        }
      });
    }
  }, []);

  return (
    <>
      {name ? (
        <div>
          <DisplayMsg msgArr={msgArr} name={name} />
          <TypeMsg
            appendFun={(inpMsg, inpPos) => append(inpMsg, inpPos)}
            name={name}
          />
        </div>
      ) : (
        <h1 className="homeText">
          Enter your name to display messages,
          <a onClick={() => window.location.reload()}> Reload Page</a>
        </h1>
      )}
    </>
  );
}

export default App;
