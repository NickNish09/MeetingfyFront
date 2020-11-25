import React, {useState, useEffect} from "react";
import {Typography, Divider} from "antd";
import {getRoom} from "../services/room";
import { UserOutlined } from '@ant-design/icons';
import Calendar from '../components/rooms/Calendar';
import moment from 'moment';

const { Title } = Typography;

const Room = ({match}) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoom(match.params.roomId).then(response => {
      setRoom(response.data);
      setLoading(false);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const eventsFormated = () => {
    if(room === {}){
      return [{
        'title': 'My event',
        'start': moment().toDate(),
        'end': moment().add(2, "hours").toDate()
      }]
    }
    return room.meetings.map((meeting) => ({
      'title': meeting.title,
      'start': moment(meeting.meeting_start).toDate(),
      'end': moment(meeting.meeting_end).toDate()
    }))
  }
  return(
    loading ? <div><p>Loading...</p></div> :
      <div className={'container'}>
        <div className={'d-flex justify-content-between align-items-center'}>
          <Title className={'title mt-15'}>{room.name}</Title>
          <div className={'d-flex align-items-center'}>
            <p className={'text-capability'}>{room.capability}</p>
            <UserOutlined className={'room-icon'}/>
          </div>
        </div>
        <Divider className={'divider'}/>
        <Calendar eventsList={
          eventsFormated()
        }
        roomId={room.id}
        />
      </div>
  )
}

export default Room;
