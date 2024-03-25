//@ts-check

const BASE_URL = 'https://6cd7-196-216-220-211.ngrok-free.app/api/v1/wallet';

/**
 * @description Function to fetch the wallet balance
 * @param {string} phoneNumber
 */
async function fetchWalletBalance(phoneNumber) {
  const response = await fetch(`${BASE_URL}?phoneNumber=${phoneNumber}`).then((res) => res.json());

  return response.balance;
}

module.exports = { fetchWalletBalance };
