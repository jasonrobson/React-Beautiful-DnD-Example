import React, { Component } from "react";
import { Draggable as NativeDraggable } from "react-beautiful-dnd";
import "./styles.css";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});

class Draggable extends Component {
  render() {
    const { item, index } = this.props;
    console.log(index);
    return (
      <NativeDraggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {item.content}
          </div>
        )}
      </NativeDraggable>
    );
  }
}

//the wrapped component:
export default Draggable;
