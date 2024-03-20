//@ts-check
import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Transfer!'));
app.post('/', async (c) => {
  const param = await c.req.json();
  console.log('🚀 ~ app.post ~ param:', param);

  return c.json('Created transfer!', 201);
});

export default app;
