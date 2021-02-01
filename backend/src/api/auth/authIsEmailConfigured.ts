import ApiResponseHandler from '../apiResponseHandler';
import EmailSender from '../../services/emailSender';

export default async (req, res, next) => {
  try {
    const payload = EmailSender.isConfigured;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
