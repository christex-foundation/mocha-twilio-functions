//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Create!'));
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
