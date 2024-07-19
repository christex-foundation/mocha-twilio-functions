//@ts-check

/**
 * Handle Cash-Out Request
 */
exports.handler = async function (context, event, callback) {
  console.log('🚀 ~ event:', event);
  const { wallet, intents, utils } = importTwilioModules();
  const { to } = event;

  console.log(`Creating cash out intent for ${to}`);
  const { id } = await intents.createCashOutIntent({ from_number: to });

  console.log(`Fetching wallet balance for ${to}`);
  const balance = await wallet.fetchWalletBalance(to);

  callback(null, {
    responseMessage: `Your balance is *\$${balance}*. How much would you like to cash out?
_🔁 The current exchange rate is 1 USD = 23.5 SLL_

_Example: 9.5_`,
    id,
  });
};

function importTwilioModules() {
  // @ts-ignore
  const walletPath = Runtime.getAssets()['/wallet.js'].path;
  const wallet = require(walletPath);

  // @ts-ignore
  const intentsPath = Runtime.getAssets()['/intents.js'].path;
  const intents = require(intentsPath);

  // @ts-ignore
  const utilsPath = Runtime.getAssets()['/utils.js'].path;
  const utils = require(utilsPath);
  return { wallet, intents, utils };
}
