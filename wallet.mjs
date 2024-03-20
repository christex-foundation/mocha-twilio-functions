//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Create!'));
app.post('/', async (c) => {
  const param = await c.req.json();
  console.log(process.env.USDC_MINT);
  console.log('🚀 ~ app.post ~ param:', param);
  return c.json('Created wallet!', 201);
});

export default app;
