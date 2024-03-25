//@ts-check
import { registerMessage, sendSingleMessage } from '../utils/messages';
import { fetchWalletBalance } from '../utils/wallet';

/**
 * @description This function is used to send a payment notification
 */
exports.handler = async function (context, event, callback) {
  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();
  const { sendTo, from, amount, contentSid } = event;

  const walletBalance = await fetchWalletBalance(sendTo);

  const contentTemplateVariables = {
    1: from,
    2: amount,
    contentSid,
    sendTo: `whatsapp:+${sendTo}`,
  };

  const message = await sendSingleMessage({ client, contentTemplateVariables });
  await registerMessage({ client, contentTemplateVariables, message });

  callback(null, 'Message sent');
};
