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
          {({ items, onUpdateItem }) => {
            const filters = getFilters(items);
            const filteredItems = getFilteredItems(filters, items);
            return filteredItems.map((v, i) => (
              <Droppable key={v.filter} droppableId={v.filter}>
                {v.items.map(item => (
                  <Draggable
                    key={item.id}
                    onUpdateItem={onUpdateItem}
                    item={item}
                  />
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
