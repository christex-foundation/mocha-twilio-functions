//@ts-check

const BASE_URL = `${process.env.MOCHA_API_URL}/api/v1/wallet`;

/**
 * @description Function to fetch the wallet balance
 * @param {string} phoneNumber
 */
async function fetchWalletBalance(phoneNumber) {
  const response = await fetch(`${BASE_URL}/${phoneNumber}`, {
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  return response.balance;
}

module.exports = { fetchWalletBalance };
