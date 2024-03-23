//@ts-check
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import wallet from './routes/wallet/index.mjs';
import transfer from './routes/transfer/index.mjs';
import convert from './routes/convert/index.mjs';
import request from './routes/request/index.mjs';
import { showRoutes } from 'hono/dev';

const app = new Hono().basePath('/api');

app.route('/v1/wallet', wallet);
app.route('/v1/transfer', transfer);
app.route('/v1/convert', convert);
app.route('/v1/request', request);

const port = 3001;
console.log(`Server is running on port ${port}`);

showRoutes(app);

serve({
  fetch: app.fetch,
  port,
});
