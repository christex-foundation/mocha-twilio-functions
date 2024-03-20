import { Hono } from 'hono';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const app = new Hono();

app.get('/', (c) => c.json('Hello Create!'));
app.post('/', (c) => c.json('Created wallet!', 201));

export default app;
