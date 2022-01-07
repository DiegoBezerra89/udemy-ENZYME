import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  return (
    <div className="head" data-test="component-app">
      <h1 data-test="counter-display">
        The counter Display is&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <h2
        className={`error ${error ? "" : "hidden"}`}
        data-test="alert-message"
      >
        The counter cannot go below 0
      </h2>
      <button
        className="button"
        data-test="increment-button"
        onClick={() => {
          if (error) {
            setError(false);
          }
          setCount(count + 1);
        }}
      >
        Increment Counter
      </button>
      {count >= 0 && (
        <button
          className="button"
          data-test="decrement-button"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            } else {
              setError(true);
            }
          }}
        >
          Decrement Counter
        </button>
      )}
    </div>
  );
}

export default App;
