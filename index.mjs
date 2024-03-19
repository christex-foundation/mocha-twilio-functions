import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import create from './create.mjs';

const app = new Hono();

app.route('/create', create);

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
