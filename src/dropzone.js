import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./constants";

const dropTarget = {
  drop(props, monitor) {
    return { droppableId: props.droppableId };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class Droppable extends Component {
  render() {
    const { children, connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <div
          style={{
            margin: 15,
            width: 200,
            minHeight: 100,
            backgroundColor: "red",
            padding: 15,
            float: "left"
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.THING, dropTarget, collect)(Droppable);
