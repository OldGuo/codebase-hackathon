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
      items: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://api.trello.com/1/boards/${
        process.env.REACT_APP_TRELLO_BOARD
      }/lists?key=${process.env.REACT_APP_TRELLO_KEY}&token=${
        process.env.REACT_APP_TRELLO_TOKEN
      }`,
    )
      .then(res => res.json())
      .then(result => console.log('Lists:', result));
    fetch(
      `https://api.trello.com/1/members/me/boards?key=${
        process.env.REACT_APP_TRELLO_KEY
      }&token=${process.env.REACT_APP_TRELLO_TOKEN}`,
    )
      .then(res => res.json())
      .then(result => console.log('Boards: ', result));
    fetch(
      `https://api.trello.com/1/lists/${
        process.env.REACT_APP_TRELLO_LIST
      }/cards?key=${process.env.REACT_APP_TRELLO_KEY}&token=${
        process.env.REACT_APP_TRELLO_TOKEN
      }`,
    )
      .then(res => res.json())
      .then(result => {
        console.log('Cards: ', result);
        this.setState({
          items: result.map((item, index) => ({
            id: item.id,
            name: item.name,
          })),
        });
      });
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="trello-list">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id="trello-list">
              {this.state.items.map((item, index) => (
                <Card key={item.id} item={item} index={index} />
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
