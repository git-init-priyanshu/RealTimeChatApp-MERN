import React from "react";
import "./textArea.css";

export default function RightText({ msg }) {
  return (
    <div className="msg right">
      <p>{msg}</p>
    </div>
  );
}
