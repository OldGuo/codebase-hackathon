// @format
import React from 'react';
import Card from './Card';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Trello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['item1', 'item2', 'item3'],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(this.state.items, source.index, destination.index);
      this.setState({items});
    }
  };

  render() {
    console.log(process.env);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="trello-list">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id="trello-list">
              {this.state.items.map((item, index) => (
                <Card key={item} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Trello;
