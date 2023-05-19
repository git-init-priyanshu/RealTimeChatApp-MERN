import { useContext, useEffect, useState } from "react";
import DisplayMsg from "./Components/DisplayMsg";
import TypeMsg from "./Components/TypeMsg";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function App() {
  const [name, setName] = useState("");

  const [msgArr, setMsgArr] = useState([]);

  const append = (msg, position, name) => {
    setMsgArr((currentArr) => {
      return [...currentArr, { msg, position, name }];
    });
  };

  useEffect(() => {
    const userName = prompt("Enter your name to join the chat");
    setName(userName);

    if (userName) {
      socket.emit("new-user-joined", userName);

      socket.on("user-joined", (name) => {
        append(`${name} joined the chat`, `center`, `${name}`);
      });

      socket.on("receive", (data) => {
        if (data.name !== userName) {
          append(`${data.msg}`, `left`, `${data.name}`);
          console.log("append");
        }
      });
    }
  }, []);

  return (
    <>
      {name ? (
        <div>
          <DisplayMsg msgArr={msgArr} />
          <TypeMsg
            appendFun={(inpMsg, inpPos, name) => append(inpMsg, inpPos, name)}
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
