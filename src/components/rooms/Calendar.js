import React, {useState} from 'react';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Card } from 'antd';
import {createEvent} from "../../services/room";
const localizer = momentLocalizer(moment);

const RoomCalendar = ({eventsList, roomId}) => {
  const [events, setEvents] = useState(eventsList);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Nome do Evento');
    if (title){
      createEvent(roomId, start, end, title).then(response => {
        console.log(response.data);
        setEvents((prevEvents) => (
          [...prevEvents, {start, end, title}] // appends the event to state
        ));
      }).catch(error => {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      });
    }
  };

  return (
    <Card>
      <div style={{height: 600}}>
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          defaultDate={moment().toDate()}
          min={moment().startOf('day').add(8, 'hours').toDate()}
          max={moment().startOf('day').add(18, 'hours').toDate()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </div>
    </Card>
  )
}

export default RoomCalendar;
