import React from 'react';
import { Card, Button } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";

const RoomCard = ({roomId, title, capability, history}) => {
  return(
    <Card title={title} className={'mb-15 ml-5 mr-5'}>
      <div className={'d-flex justify-content-between'}>
        <div>
          <UserOutlined/>
          {capability}
        </div>
        <Button type="primary" icon={<CalendarOutlined />} size={'large'} onClick={() => {
          history.push(`/sala/${roomId}`);
        }}
          className={'btn-agendar'}
        >
          Agendar
        </Button>
      </div>
    </Card>
  )
}

export default withRouter(RoomCard);
