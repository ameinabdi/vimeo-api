import { notification } from 'antd';

export default class Message {
  static success(arg) {
    notification.success({
      message: arg,
      description: '',
      placement: 'bottomLeft',
    });
  }

  static error(arg) {
    notification.error({
      message: arg,
      description: '',
      placement: 'bottomLeft',
    });
  }
}
