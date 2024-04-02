//@ts-check
/**
 * @description This function is used to send a message to the agent
 */
exports.handler = async function (context, event, callback) {
  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();
  const { request, bodySHA256, ...contentTemplateVariables } = event;

  await sendSingleMessage({ client, contentTemplateVariables });

  callback(null, 'Message sent');
};

async function sendSingleMessage({ client, contentTemplateVariables }) {
  return client.messages
    .create({
      from: process.env.MESSAGING_SERVICE_SID,
      contentSid: contentTemplateVariables.contentSid,
      contentVariables: JSON.stringify(contentTemplateVariables),
      to: contentTemplateVariables.to,
    })
    .then((message) => {
      console.log(`Message ${message.sid} `);
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
}
