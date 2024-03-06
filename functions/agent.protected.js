//@ts-check
/**
 * @description This function is used to send a message to the agent
 */
exports.handler = function (context, event, callback) {
  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();

  callback(null, 'Message sent');
};
