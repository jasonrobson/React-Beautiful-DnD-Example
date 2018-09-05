import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Lists from "./lists";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <Lists />
  </DragDropContextProvider>,
  rootElement
);
