//@ts-check

// Function to send a single message
async function sendSingleMessage({ client, contentTemplateVariables }) {
  return client.messages
    .create({
      from: process.env.MESSAGING_SERVICE_SID,
      contentSid: contentTemplateVariables.contentSid,
      contentVariables: JSON.stringify(contentTemplateVariables),
      to: contentTemplateVariables.sendTo,
    })
    .then((message) => {
      console.log(`Message ${message.sid} sent to ${contentTemplateVariables.sendTo} `);
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Function to register the message using Twilio Sync
async function registerMessage({ client, contentTemplateVariables, message }) {
  const phoneNumber = contentTemplateVariables.sendTo;

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

module.exports = { sendSingleMessage, registerMessage };
