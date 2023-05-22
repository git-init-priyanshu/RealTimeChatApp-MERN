import { useEffect, useState } from "react";

import DisplayMsg from "./Messages-area/DisplayMsg";
import TypeMsg from "./Input-area/TypeMsg";

import "./App.css";

import socket from "./socket";

function App() {
  useEffect(() => {
    const fetchDB = fetch("http://localhost:5000/");
  }, [msgArr]);

  // Stores name of the user
  const [name, setName] = useState("");

  // Array containing objects as its elements
  const [msgArr, setMsgArr] = useState([]);

  // The main function of entire application
  const append = (msg, position, name) => {
    setMsgArr((currentArr) => {
      return [...currentArr, { msg, position, name }];
    });
  };

  useEffect(() => {
    const userName = prompt("Enter your name to join the chat");
    setName(userName);

    if (userName) {
      // Emitting event whenever a new user join the chat
      socket.emit("new-user-joined", userName);

      // Handler which listens to the event when a user join
      socket.on("user-joined", (name) => {
        append(`${name} joined the chat`, `center`, `${name}`);
      });

      // Handler which listens to the event when a user receives a message
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
