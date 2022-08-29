import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./style.css"

import { io } from "socket.io-client";

function App() {
  const [input, setInput] = useState("");
  const textInput = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8080");

    socket.current.on("connection", () => {
      console.log("connected to the server");
    });
  }, []);

  const handleClick = () => {
    setInput(textInput.current.value);
    socket.current.emit("message", input);
  };
  return (
    <div className="App">
      <h1>PROTOTYPE</h1>
      <div className="Contents">
      <input type="text" className="myInput" ref={textInput}></input>
      <button type="button" className="myInput" onClick={handleClick}>
        Send
      </button>
      </div>
      <p>{input}</p>
    </div>
  );
}

export default App;
