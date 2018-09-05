import React, { Component } from "react";
import { Droppable as NativeDroppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  minHeight: 250,
  float: "left"
});

class Droppable extends Component {
  render() {
    const { children, filter } = this.props;

    return (
      <NativeDroppable droppableId={filter.toString()}>
        {({ innerRef, placeholder, isDraggingOver }) => (
          <div ref={innerRef} style={getListStyle(isDraggingOver)}>
            {children}
            {placeholder}
          </div>
        )}
      </NativeDroppable>
    );
  }
}

export default Droppable;
