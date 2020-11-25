import React, { useState, useEffect } from 'react';
import {getRooms} from "../services/room";
import RoomCard from "../components/rooms/RoomCard";
import { Row, Col, Typography, Divider, Button, Drawer } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import RoomForm from "../components/rooms/RoomForm";
import EditRoomCard from "../components/rooms/EditRoomCard";

const { Title } = Typography;

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getRooms().then((response) => {
      setRooms(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const removeRoom = (roomId) => {
    setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  };

  return(
      <div className={'container'}>
        <div className={'d-flex justify-content-between align-items-center'}>
          <Title className={'title mt-15'}>Salas</Title>
          <Button type="success" icon={<PlusOutlined />} size={'large'} onClick={showDrawer}>
            Nova Sala
          </Button>
        </div>
        <Divider className={'divider'} />
        <Row>
          {
            rooms.map((room) => (
                <Col lg={8} md={8} sm={12} xs={24} key={room.id} >
                  <EditRoomCard
                    roomId={room.id}
                    title={room.name}
                    capability={room.capability}
                    removeRoom={removeRoom}
                  />
                </Col>
            ))
          }
        </Row>

        <Drawer
            title="Nova Sala"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
        >
          <RoomForm setRooms={setRooms} setVisible={setVisible}/>
        </Drawer>
      </div>
  )
}

export default ManageRooms;
