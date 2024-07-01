//@ts-check

const BASE_URL = `${process.env.MOCHA_API_URL}/api/v1/intents`;

/**
 * @description Function to create cash-out intent
 */
async function postCashOutIntent({ from_number }) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      object: 'cashout_intent',
      from_number,
    }),
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  return response;
}

/**
 * @description Function to create cash-out intent
 */
async function updateCashOutIntent({ from_number, amount }) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      from_number,
      amount,
    }),
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  return response;
}

module.exports = { postCashOutIntent, updateCashOutIntent };
