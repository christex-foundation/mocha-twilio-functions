/**
 * This function should be used to send a message to the agent
 * @param {object} context
 * @param {object} event
 * @param {function} callback
 */
exports.handler = function (context, event, callback) {
  const client = context.getTwilioClient();

  callback(null, 'Message sent');
};
