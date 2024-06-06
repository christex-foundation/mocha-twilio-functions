//@ts-check
import { Hono } from 'hono';
import wallet from '../routes/wallet/index.mjs';
import transfer from '../routes/transfer/index.mjs';
import convert from '../routes/convert/index.mjs';
import request from '../routes/request/index.mjs';
import paymentIntent from '../routes/payment_intent/index.mjs';
import { showRoutes } from 'hono/dev';
import { handle } from '@hono/node-server/vercel';

const app = new Hono().basePath('/api');

app.route('/v1/wallet', wallet);
app.route('/v1/transfer', transfer);
app.route('/v1/convert', convert);
app.route('/v1/request', request);
app.route('/v1/payment_intents', paymentIntent);

app.notFound((c) => {
  return c.text('Custom 404 Message', 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text('Custom Error Message', 500);
});

showRoutes(app);

export default handle(app);
