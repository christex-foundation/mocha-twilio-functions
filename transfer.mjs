//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Transfer!'));
app.post('/', async (c) => {
  const { fromNumber, toNumber, amount } = await c.req.json();

  if (!fromNumber || !toNumber || !amount) {
    return c.json(
      {
        message: 'Invalid request; missing `fromNumber`, `toNumber`, or `amount`',
      },
      400,
    );
  }

  const sig = await transfer(fromNumber, toNumber, Number(amount));

  return c.json(
    {
      message: 'Transfer successful',
      signature: sig,
    },
    200,
  );
});

export default app;

/**
 * @param {string} fromNumber
 * @param {string} toNumber
 * @param {number} amount
 * @returns {Promise<string>}
 */
async function transfer(fromNumber, toNumber, amount) {
  return '5kpKvUGgioKNSurev8vy4oevq25C9xnc21eFTpQ2DDkRoDkExnotSFXQdqTuGE4UMzMXcD827P1btUybh1HiTLyH';
}
