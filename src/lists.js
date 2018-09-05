import React, { Component } from "react";
import _ from "lodash";
import Droppable from "./dropzone";
import Draggable from "./draggable";
import { DragDropProvider, DragDropConsumer } from "./DragDropContext";

const getFilters = itemsToFilter => {
  const result = [];
  itemsToFilter.map(v => {
    if (!result.includes(v.filter)) {
      result.push(v.filter);
    }
  });
  return result;
};

const getFilteredItems = (filters, items) => {
  const result = [];
  filters.map(v =>
    result.push({
      items: _.filter(items, subV => subV.filter === v),
      filter: v
    })
  );
  return result;
};

class Lists extends Component {
  render() {
    return (
      <DragDropProvider>
        <DragDropConsumer>
          {({ getOrderByFilter, draggables }) => {
            const filters = getFilters(draggables);
            return filters.map(filter => (
              <Droppable key={filter} filter={filter}>
                {getOrderByFilter(filter).map((item, index) => (
                  <Draggable key={item.id} item={item} index={index} />
                ))}
              </Droppable>
            ));
          }}
        </DragDropConsumer>
      </DragDropProvider>
    );
  }
}

export default Lists;
