//@ts-check
/**
 * @description This function is used to send a message to the agent
 */
exports.handler = async function (context, event, callback) {
  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();
  const { request, bodySHA256, ...postBody } = event;
  const contentTemplateVariables = {
    1: postBody.amount,
    2: postBody.currency,
    3: postBody.address,
    4: extractPhoneNumber(postBody.sender),
    to: 'whatsapp:+23273938372', // TODO: Replace with the agent's phone number
    ...postBody,
  };

  const message = await sendSingleMessage({ client, contentTemplateVariables });
  await registerMessage({ client, contentTemplateVariables, message });

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
      console.log(`Message ${message.sid} sent to ${contentTemplateVariables.sender} `);
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Function to register the message using Twilio Sync
async function registerMessage({ client, contentTemplateVariables, message }) {
  const phoneNumber = extractPhoneNumber(contentTemplateVariables.sender);

  return client.sync.v1
    .services(process.env.SYNC_SERVICE_SID)
    .syncMaps(process.env.SYNC_MAP_SID)
    .syncMapItems.create({
      key: `${phoneNumber}_${message.sid}`, // Use the phone number and message SID as the key
      data: {
        phoneNumber,
        contentTemplateVariables,
        contentSid: contentTemplateVariables.contentSid,
      },
    })
    .then((mapItem) => {
      console.log(`Map Item registered with SID ${mapItem.mapSid}`); // Log the registered map item
    })
    .catch((err) => {
      console.log(err); // Log any error in map item creation
    });
}

/**
 * @param {string} whatsappNumber
 * @returns {string}
 * @description Extracts the phone number from a whatsapp formated number
 */
function extractPhoneNumber(whatsappNumber) {
  return whatsappNumber.split(':')[1];
}
