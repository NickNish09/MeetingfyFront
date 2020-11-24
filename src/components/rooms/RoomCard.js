import React from 'react';
import { Card, Button } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

const RoomCard = ({title, capability}) => {
  return(
    <Card title={title} >
      <div className={'d-flex justify-content-between'}>
        <div>
          <UserOutlined/>
          {capability}
        </div>
        <Button type="primary" icon={<CalendarOutlined />} size={'large'}>
          Agendar
        </Button>
      </div>
    </Card>
  )
}

export default RoomCard;
