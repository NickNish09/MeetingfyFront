import React, { useState, useEffect } from 'react';
import {getRooms} from "../services/room";
import RoomCard from "../components/rooms/RoomCard";
import { Row, Col, Typography, Divider } from 'antd';

const { Title } = Typography;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRooms().then((response) => {
      setRooms(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return(
      <div className={'container'}>
        <Title className={'title mt-15'}>Salas</Title>
        <Divider className={'divider'} />
        <Row>
          {
            rooms.map((room) => (
              <Col lg={8} md={8} sm={12} xs={24}>
                <RoomCard title={room.name} capability={room.capability}/>
              </Col>
            ))
          }
        </Row>
      </div>
  )
}

export default Home;
