import React from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Card } from 'antd';
const localizer = momentLocalizer(moment);

const RoomCalendar = ({eventsList}) => (
    <Card>
      <div style={{height: 600}}>
        <Calendar
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
        />
      </div>
    </Card>
)

export default RoomCalendar;
