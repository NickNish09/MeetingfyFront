import React, {useState} from 'react';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone';
import { Card } from 'antd';
import {createEvent, deleteEvent} from "../../services/room";
import {openNotificationWithIcon} from "../../helpers/notifications";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const localizer = momentLocalizer(moment);

const RoomCalendar = ({eventsList, roomId}) => {
  const [events, setEvents] = useState(eventsList);

  const removeEventById = (eventId) => {
    setEvents(prevEvents => (
      prevEvents.filter(event => event.id !== eventId)
    ))
  };

  const handleSelect = ({ start, end }) => {
    let meeting_start = moment(start).format('lll');
    let meeting_end = moment(end).format('lll');
    const title = window.prompt('Nome do Evento');
    if (title){
      createEvent(roomId, meeting_start, meeting_end, title).then(response => {
        console.log(response.data);
        let id = response.data.id;
        let user_id = response.data.user_id;
        setEvents((prevEvents) => (
          [...prevEvents, {start, end, title, id, user_id}] // appends the event to state
        ));
      }).catch(error => {
        console.log(error.response.data);
        openNotificationWithIcon('error', 'Erro ao marcar reunião', error.response.data.error);
      });
    }
  };

  const handleDelete = (meetingId) => {
    if(window.confirm('Deseja desmarcar essa reunião?')){
      deleteEvent(meetingId).then(response => {
        openNotificationWithIcon('info', 'Reunião desmarcada', response.data.msg)
        removeEventById(meetingId);
      }).catch(error => {
        openNotificationWithIcon('error', 'Erro ao desmarcar reunião', error.response.data.error)
      });
    }
  };

  const handleEdit = (meetingId) => {

  };

  const Event = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        <div className={'d-flex justify-content-end inner-event'}>
          <DeleteOutlined className={'mr-5'} onClick={() => handleDelete(event.id)}/>
          {/*<EditOutlined onClick={() => handleEdit(event.id)}/>*/}
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
          onSelectSlot={handleSelect}
          components={{event: Event}}
          messages={{
            month: 'Mês',
            day: 'Dia',
            today: 'Hoje',
            week: 'Semana',
            previous: '<<',
            next: '>>'
          }}
        />
      </div>
    </Card>
  )
}

export default RoomCalendar;
