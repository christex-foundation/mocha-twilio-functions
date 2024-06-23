//@ts-check

/**
 * @description This function is used to send a payment notification
 */
exports.handler = async function (context, event, callback) {
  const { wallet, messages } = importTwilioModules();

  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();
  const { sendTo, from, amount, contentSid } = event;

  const walletBalance = await wallet.fetchWalletBalance(sendTo);

  const contentTemplateVariables = {
    1: from,
    2: `$${walletBalance}`,
    contentSid,
    sendTo: `whatsapp:+${sendTo}`,
  };

  const message = await messages.sendSingleMessage({ client, contentTemplateVariables });
  await messages.registerMessage({ client, contentTemplateVariables, message });

  callback(null, 'Message sent');
};

function importTwilioModules() {
  // @ts-ignore
  const walletPath = Runtime.getAssets()['/wallet.js'].path;
  const wallet = require(walletPath);
  // @ts-ignore
  const messagesPath = Runtime.getAssets()['/messages.js'].path;
  const messages = require(messagesPath);
  return { wallet, messages };
}
