import React, { useEffect } from "react";

export default function DisplayMsg(props) {
  useEffect(() => {
    const appendMsg = () => {
      console.log(props.msg, props.pos);
      const msgElement = document.createElement("div");
      msgElement.innerText = props.msg;
      msgElement.classList.add("msg");
      msgElement.classList.add(props.pos);

      const msgContainer = document.querySelector(".container");
      msgContainer.append(msgElement);
    };
    props.msg && appendMsg();
  }, [props.msg]);

  return (
    <div className="container">
      <div className="msg right">
        You: How are you? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Corrupti blanditiis eveniet labore mollitia consectetur sapiente
        sed earum, nostrum deleniti. Libero?
      </div>
      <div className="msg left">Rohan: How are you?</div>
    </div>
  );
}
