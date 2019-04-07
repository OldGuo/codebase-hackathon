// @format
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './styles/App.css';

export default class Calendar extends React.Component {
  handleDateClick = arg => {
    // TODO: GOOGLE CALENDAR STUFF
    alert(arg.dateStr);
  };

  handleSelect = arg => {
    // TODO: GOOGLE CALENDAR STUFF
    alert(`selected + ${arg.startStr} to + ${arg.endStr}`);
  };

  render() {
    return (
      <div id="calendar-list">
        <FullCalendar
          defaultView="timeGridWeek"
          selectable
          dateClick={this.handleDateClick}
          select={this.handleSelect}
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        />
      </div>
    );
  }
}
