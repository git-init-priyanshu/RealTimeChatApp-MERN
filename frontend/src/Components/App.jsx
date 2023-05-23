import { useEffect, useState } from "react";

import DisplayMsg from "./Messages-area/DisplayMsg";
import TypeMsg from "./Input-area/TypeMsg";

import "./App.css";

import socket from "./socket";

function App() {
  // Stores name of the user
  const [name, setName] = useState("");

  // Array containing objects as its elements
  const [msgArr, setMsgArr] = useState([]);

  // Fetching all the data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:5000/api/fetchdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataJson = await data.json();
      // setMsgArr(msgArr.concat(dataJson));
      setMsgArr(dataJson);
    };
    fetchData();
  }, []);

  // The main function of entire application
  const append = (name, msg, position, isOnline) => {
    setMsgArr((currentArr) => {
      return [...currentArr, { name, msg, position, isOnline }];
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
        append(`${name}`, `${name} joined the chat`, `center`, true);
      });

      // Handler which listens to the event when a user receives a message
      socket.on("receive", (data) => {
        if (data.name !== userName) {
          append(`${data.name}`, `${data.msg}`, `left`, true);
        }

        // Emitting event whenever the user disconnects
        window.addEventListener("offline", () => {
          socket.emit("disconnect", name);
        });
      });
    }
  }, []);

  return (
    <>
      {name ? (
        <div>
          <DisplayMsg msgArr={msgArr} name={name} />
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
