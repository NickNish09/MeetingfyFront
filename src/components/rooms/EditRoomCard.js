import React, {useState} from 'react';
import { Card, Input, InputNumber } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import {deleteRoom, updateRoom} from "../../services/room";
import {openNotificationWithIcon} from "../../helpers/notifications";

const EditRoomCard = ({roomId, title, capability, removeRoom, history}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(title);
  const [roomCapability, setRoomCapability] = useState(capability);

  const handleDelete = () => {
    if(window.confirm("Quer mesmo deletar a sala?")){
      deleteRoom(roomId).then(response => {
        openNotificationWithIcon('info', 'Sala deletada');
        removeRoom(roomId);
      }).catch(error => {
        console.log(error.response.data);
        openNotificationWithIcon('error', 'Erro ao deletar sala', error.response.data.error);
      });
    }
  }

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleDone = () => {
    updateRoom(roomId, name, roomCapability).then(response => {
      openNotificationWithIcon('success','Sala atualizada');
    }).catch(error => {
      openNotificationWithIcon('error','Erro ao atualizar sala', error.response.data.error);
    });
    setIsEditing(false);
  };

  return(
      <Card
        title={isEditing ?
          <Input value={name} onChange={(e) => setName(e.target.value)}/> :
          name
        }
        className={'mb-15 ml-5 mr-5'}
        actions={[
          isEditing? <CheckOutlined key="edit" onClick={handleDone}/> : <EditOutlined key="edit" onClick={handleIsEditing}/>,
          <DeleteOutlined key="ellipsis" onClick={handleDelete}/>,
        ]}
      >
        <div className={'d-flex justify-content-between'}>
          <div>
            <UserOutlined/>
            {isEditing ? <InputNumber value={roomCapability} onChange={(e) => setRoomCapability(e)}/> : roomCapability}
          </div>
        </div>
      </Card>
  )
}

export default withRouter(EditRoomCard);
