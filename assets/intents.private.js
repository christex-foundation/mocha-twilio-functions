//@ts-check

const BASE_URL = `${process.env.MOCHA_API_URL}/api/v1/intents`;

/**
 * @description Function to create cash-out intent
 */
async function createCashOutIntent({ from_number }) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      object: 'cashout_intent',
      from_number,
    }),
    // @ts-ignore
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  return response;
}

/**
 * @description Function to create cash-out intent
 */
async function updateCashOutIntent(id, { from_number, amount }) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      from_number,
      amount,
    }),
    // @ts-ignore
    headers: {
      'X-API-Key': process.env.MOCHA_API_KEY,
    },
  }).then((res) => res.json());

  return response;
}

module.exports = { createCashOutIntent, updateCashOutIntent };
