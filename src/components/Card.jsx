// @format
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

class Card extends React.Component {
  render() {
    return (
      <Draggable
        key={this.props.item.id}
        draggableId={this.props.item.id}
        index={this.props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="trello-item">
            {this.props.item.name}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
