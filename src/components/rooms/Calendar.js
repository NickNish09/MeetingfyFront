import React, {useState} from 'react';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import { Card } from 'antd';
import {createEvent} from "../../services/room";
import {openNotificationWithIcon} from "../../helpers/notifications";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const localizer = momentLocalizer(moment);

const RoomCalendar = ({eventsList, roomId}) => {
  const [events, setEvents] = useState(eventsList);

  const handleSelect = ({ start, end }) => {
    let meeting_start = moment(start).format('lll');
    let meeting_end = moment(end).format('lll');
    console.log(meeting_start);
    console.log(meeting_end);
    const title = window.prompt('Nome do Evento');
    if (title){
      createEvent(roomId, meeting_start, meeting_end, title).then(response => {
        console.log(response.data);
        setEvents((prevEvents) => (
          [...prevEvents, {start, end, title}] // appends the event to state
        ));
      }).catch(error => {
        console.log(error.response);
        openNotificationWithIcon('error', 'Erro ao marcar reunião', error.response.data.error);
      });
    }
  };

  const Event = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        <div className={'d-flex justify-content-end inner-event'}>
          <DeleteOutlined className={'mr-5'}/>
          <EditOutlined/>
        </div>
      </span>
    )
  }

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
          onSelectEvent={event => openNotificationWithIcon('info', event.title)}
          onSelectSlot={handleSelect}
          components={{event: Event}}
        />
      </div>
    </Card>
  )
}

export default RoomCalendar;
