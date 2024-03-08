//@ts-check

const exchangeRates = {
  base: 'USD',
  rates: {
    SLL: 23.5,
  },
};

/**
 * @description This function is used to calculate transaction details
 */
exports.handler = async function (context, event, callback) {
  callback(null, {
    msg: 'Message sent',
    transferNetwork: 'SPL',
    recipient: 'cogoo.sol (7z7a..pKQQ)',
    localAmount: '1650',
    localCurrency: 'SLL',
  });
};
