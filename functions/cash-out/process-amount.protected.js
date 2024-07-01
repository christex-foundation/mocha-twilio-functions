//@ts-check

/**
 * Validates amount and confirm transaction
 */
exports.handler = async function (context, event, callback) {
  const { wallet, intents, utils } = importTwilioModules();
  const { to, amount } = event;
  const phoneNumber = utils.extractPhoneNumber(to);

  console.log(`Fetching wallet balance for ${phoneNumber}`);
  const balance = await wallet.fetchWalletBalance(phoneNumber);

  if (balance < amount) {
    callback({
      responseMessage: `You do not have enough funds to cash out. Your balance is *${balance}*
      `,
    });

    return;
  }

  console.log(`Updating cash out intent for ${phoneNumber}`);
  await intents.updateCashOutIntent({
    from_number: phoneNumber,
    amount,
  });

  callback(null, {
    responseMessage: `How would you like to cash out?

💵 1. Cash Pick-up/Drop-off
🟠 2. Orange Money
💼 3. Wallet Address`,
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
