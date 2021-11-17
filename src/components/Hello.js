import React, { useEffect, useState } from "react";

export const Hello = () => {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch("/api/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => setInitialState(jsonResponse.hello));
  });
  return (
    <div>
      {initialState.length > 0 &&
        initialState.map((name, index) => (
          <ul key={index}>
            <li>{name}</li>
          </ul>
        ))}
    </div>
  );
};

export default Hello;
