import React from "react";
import "./textArea.css";

export default function LeftText(props) {
  return (
    <div className="msg left">
      <h1>{props.name}</h1>
      <p>{props.msg}</p>
    </div>
  );
}
