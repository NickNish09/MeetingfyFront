import React, { useState, useEffect } from 'react';
import {getRooms} from "../services/room";
import RoomCard from "../components/rooms/RoomCard";
import {Row, Col, Typography, Divider, Button, Drawer, Card} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import RoomForm from "../components/rooms/RoomForm";

const { Title } = Typography;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms().then((response) => {
      setRooms(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
        {
          loading ? <Row>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Card loading={true} className={"ml-5 mr-5 rivalry-card-placeholder"} />
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Card loading={true} className={"ml-5 mr-5 rivalry-card-placeholder"} />
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Card loading={true} className={"ml-5 mr-5 rivalry-card-placeholder"} />
            </Col>
          </Row> : <Row>
            {
              rooms.map((room) => (
                  <Col lg={8} md={8} sm={12} xs={24} key={room.id} >
                    <RoomCard roomId={room.id} title={room.name} capability={room.capability}/>
                  </Col>
              ))
            }
          </Row>
        }

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

export default Home;
