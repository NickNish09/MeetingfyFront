import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Spin} from "antd";
import {openNotificationWithIcon} from "../../helpers/notifications";
import {createRoom} from "../../services/room";

const RoomForm = ({setRooms, setVisible}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    createRoom(values.name, values.capability).then(response => {
      console.log(response.data);
      setLoading(false);
      setRooms(prevRooms => [...prevRooms, response.data]);
      form.resetFields();
      setVisible(false);
      openNotificationWithIcon('success', 'Sala Criada', `${response.data.name} foi criada.`)
    }).catch(error => {
      console.log(error.response.data);
      openNotificationWithIcon('error', 'Erro ao criar sala', error.response.data.error);
      setLoading(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return <div>
    <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
    >
      <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Coloque o nome da sala",
            },
          ]}
      >
        <Input
            type={"text"}
            placeholder={"nome da sala"}
        />
      </Form.Item>

      <Form.Item
          name="capability"
          rules={[
            {
              required: true,
              message: "Coloque o número de pessoas que cabem na sala",
            },
          ]}
      >
        <InputNumber min={1} placeholder={'capacidade'}/>
      </Form.Item>

      <Form.Item className={"mt-15"}>
        {loading ? (
            <div className={"spin-container"}>
              <Spin size={"large"} />
            </div>
        ) : (
            <Button htmlType="submit" className={"auth-submit"}>
              Submit
            </Button>
        )}
      </Form.Item>
    </Form>
  </div>
}

export default RoomForm;
