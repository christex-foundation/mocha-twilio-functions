//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';
import { transfer } from './transfer.mjs';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Transfer!'));
app.post('/', async (c) => {
  const { fromNumber, toNumber, amount } = await c.req.json().catch(() => ({}));

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
      fromNumber,
      toNumber,
      amount,
      transactionId: sig,
    },
    200,
  );
});

export default app;
