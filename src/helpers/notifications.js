import { notification } from "antd";

export const openNotificationWithIcon = (type, title, message) => {
  const functionToCall = {
    success: notification.success,
    primary: notification.open,
    info: notification.info,
    error: notification.error,
  };
  functionToCall[type]({
    message: title,
    description: message,
  });
};
