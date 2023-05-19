import React from "react";
import "./textArea.css";

export default function LeftText({ msg }) {
  return (
    <div className="msg center">
      <p>{msg}</p>
    </div>
  );
}
