import React, { Component, createContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getItems = quantity => {
  const result = [];
  for (let i = 0; i < quantity; i++) {
    result.push({
      id: i,
      content: "----------".concat(i).concat("----------"),
      filter: getRandomInt(0, 3)
    });
  }
  return result;
};

const Context = createContext({
  draggables: [],
  getOrderByFilter: () => {}
});

export class DragDropProvider extends Component {
  state = {
    draggables: getItems(500),
    getOrderByFilter: this.getOrderByFilter
  };

  getOrderByFilter = filter =>
    _.groupBy(this.state.draggables, "filter")[filter] || [];

  updateDraggable = draggable =>
    this.setState(({ draggables }) => ({
      draggables: draggables.map(currentDraggable => {
        if (currentDraggable.id === draggable.id) {
          return _.merge(currentDraggable, draggable);
        }

        return currentDraggable;
      })
    }));

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    const sourceFilter = +source.droppableId;
    const destinationFilter = +destination.droppableId;

    const draggable = this.getOrderByFilter(sourceFilter)[source.index];

    this.updateDraggable({
      ...draggable,
      filter: destinationFilter
    });
  };

  render() {
    const value = {
      ...this.state,
      getOrderByFilter: this.getOrderByFilter
    };
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Context.Provider value={value}>{this.props.children}</Context.Provider>
      </DragDropContext>
    );
  }
}

export const { Consumer: DragDropConsumer } = Context;
