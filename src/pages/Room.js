import React, {useState, useEffect} from "react";
import {Typography, Divider} from "antd";
import {getRoom} from "../services/room";

const { Title } = Typography;

const Room = ({match}) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoom(match.params.roomId).then(response => {
      setRoom(response.data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);
  return(
    loading ? <div><p>Loading...</p></div> :
      <div className={'container'}>
        <Title className={'title mt-15'}>{room.name}</Title>
        <Divider className={'divider'}/>
      </div>
  )
}

export default Room;
