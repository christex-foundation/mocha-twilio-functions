//@ts-check
const { registerMessage, sendSingleMessage } = require('../utils/messages');
const { fetchWalletBalance } = require('../utils/wallet');

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
    2: `$${walletBalance}`,
    contentSid,
    sendTo: `whatsapp:+${sendTo}`,
  };

  const message = await sendSingleMessage({ client, contentTemplateVariables });
  await registerMessage({ client, contentTemplateVariables, message });

  callback(null, 'Message sent');
};
