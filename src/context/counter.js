"use client";

import { useState, useEffect, createContext } from "react";

const initialState = {
  counter: 0,
};

const getInitialState = () => {
  const count = localStorage.getItem("count") || 0;
  return count;
};

export const CounterContext = createContext({
  appState: initialState,
  incrementCounter: () => null,
  decrementCounter: () => null
});

export const CounterContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    counter: 0,
  });

  useEffect(() => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      setAppState(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);
  
  const incrementCounter = () => {
    setAppState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  };

  const decrementCounter = () => {
    setAppState((prevState) => ({
      ...prevState,
      counter: prevState.counter - 1,
    }));
  };

  return (
    <CounterContext.Provider value={{ appState, incrementCounter, decrementCounter }}>
      {children}
    </CounterContext.Provider>
  );
};
