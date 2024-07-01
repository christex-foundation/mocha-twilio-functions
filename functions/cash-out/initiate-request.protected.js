//@ts-check

/**
 * Handle Cash-Out Request
 */
exports.handler = async function (context, event, callback) {
  const { wallet, intents } = importTwilioModules();
  const { to } = event;
  const phoneNumber = extractPhoneNumber(to);

  console.log(`Creating cash out intent for ${phoneNumber}`);
  await intents.postCashOutIntent({ from_number: phoneNumber });

  console.log(`Fetching wallet balance for ${phoneNumber}`);
  const balance = await wallet.fetchWalletBalance(phoneNumber);

  callback(null, {
    responseMessage: `Your balance is *${balance}*. How much would you like to cash out?
_🔁 The current exchange rate is 1 USD = 23.5 SLL_

_Example: 9.5_`,
  });
};

/**
 * @param {string} whatsappNumber
 * @returns {string}
 * @description Extracts the phone number from a whatsapp formated number
 */
function extractPhoneNumber(whatsappNumber) {
  return whatsappNumber.split(':')[1];
}

function importTwilioModules() {
  // @ts-ignore
  const walletPath = Runtime.getAssets()['/wallet.js'].path;
  const wallet = require(walletPath);

  // @ts-ignore
  const intentsPath = Runtime.getAssets()['/intents.js'].path;
  const intents = require(intentsPath);
  return { wallet, intents };
}
