//@ts-check
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import wallet from './wallet.mjs';
import transfer from './transfer.mjs';
import convert from './convert.mjs';
import { showRoutes } from 'hono/dev';

const app = new Hono().basePath('/api');

app.route('/v1/wallet', wallet);
app.route('/v1/transfer', transfer);
app.route('/v1/convert', convert);

const port = 3001;
console.log(`Server is running on port ${port}`);

showRoutes(app);

serve({
  fetch: app.fetch,
  port,
});
