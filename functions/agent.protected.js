//@ts-check
/**
 * @description This function is used to send a message to the agent
 */
exports.handler = async function (context, event, callback) {
  /**
   * @type {import('twilio').Twilio}
   */
  const client = context.getTwilioClient();
  const { request, bodySHA256, ...contentVariables } = event;

  const message = await sendSingleMessage({ client, context, contentVariables });
  await registerMessage({ client, context, contentVariables, message });

  callback(null, 'Message sent');
};

async function sendSingleMessage({ client, contentVariables, context }) {
  contentVariables = {
    ...contentVariables,
    1: contentVariables.amount,
    2: contentVariables.currency,
    3: contentVariables.address,
    4: extractPhoneNumber(contentVariables.sender),
  };

  return client.messages
    .create({
      from: process.env.MESSAGING_SERVICE_SID,
      contentSid: contentVariables.contentSid,
      contentVariables: JSON.stringify(contentVariables),
      to: 'whatsapp:+23273938372', // TODO: Replace with the agent's phone number
    })
    .then((message) => {
      console.log(`Message ${message.sid} sent to ${contentVariables.sender} `);
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Function to register the message using Twilio Sync
async function registerMessage({ client, context, contentVariables, message }) {
  const phoneNumber = extractPhoneNumber(contentVariables.sender);

  return client.sync.v1
    .services(process.env.SYNC_SERVICE_SID)
    .syncMaps(process.env.SYNC_MAP_SID)
    .syncMapItems.create({
      key: `${phoneNumber}_${message.sid}`, // Use the phone number and message SID as the key
      data: {
        phoneNumber,
        contentVariables,
        contentSid: contentVariables.contentSid,
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
