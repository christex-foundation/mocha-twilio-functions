//@ts-check

const BASE_URL = `${process.env.MOCHA_API_URL}/api/v1/wallet`;

/**
 * @description Function to fetch the wallet balance
 * @param {string} phoneNumber
 */
async function fetchWalletBalance(phoneNumber) {
  const response = fetch(`${BASE_URL}/${phoneNumber}`, {
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  const onChainResponse = connection.getBalance('mitcch.sol');

  Promise.all([response, onChainResponse, someOther]).then((values) => {
    const [walletResponse, onChainBalance, someOther] = values;

    (walletResponse.balance + onChainBalance.balance, someOther.balance) / 3;
  });

  return response.balance;
}

module.exports = { fetchWalletBalance };
