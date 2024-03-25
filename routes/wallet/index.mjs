//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';
import { fetchWalletBalance } from './wallet.mjs';

dotEnvConfig();

const app = new Hono();

app.get('/:phone_number', async (c) => {
  const { phone_number: phoneNumber } = c.req.param();

  if (!phoneNumber) {
    return c.json('Invalid request; missing `phoneNumber`', 400);
  }

  // validate phone number based on area code
  // validatePhoneNumber(phoneNumber);

  const balance = await fetchWalletBalance(phoneNumber);

  return c.json({
    balance,
  });
});

app.post('/', async (c) => {
  const { phoneNumber } = await c.req.json().catch(() => ({}));

  if (!phoneNumber) {
    return c.json(
      {
        message: 'Invalid request; missing `phoneNumber`',
      },
      400,
    );
  }

  return c.json('Created wallet!', 201);
});

export default app;
