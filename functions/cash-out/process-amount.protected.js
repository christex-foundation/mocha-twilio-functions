//@ts-check

/**
 * Validates amount and confirm transaction
 */
exports.handler = async function (context, event, callback) {
  const { wallet, intents, utils } = importTwilioModules();
  const { to, amount, id } = event;

  console.log(`Fetching wallet balance for ${to}`);
  const balance = await wallet.fetchWalletBalance(to);

  // TODO: make more robust
  if (amount >= balance) {
    callback({
      responseMessage: `You do not have enough funds to cash out. Your balance is *${balance}*
      `,
    });

    return;
  }

  console.log(`Updating cash out intent for ${to}`, {
    from_number: to,
    amount,
    currency: 'USD',
  });

  await intents.updateCashOutIntent(id, {
    from_number: to,
    amount,
    currency: 'USD',
  });

  const exchangeRate = fetchExchangeRate({ from: 'USD', to: 'SLL' });

  callback(null, {
    responseMessage: `
In total, you will receive *Le ${amount * exchangeRate}*.    
    
How would you like to cash out?

💵 1. Cash Pick-up/Drop-off
🟠 2. Orange Money`,
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

function fetchExchangeRate({ from, to }) {
  return 23.5;
}
