//@ts-check
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.json('Hello Convert!'));
app.post('/', async (c) => {
  const { fromCurrency, toCurrency, amount, userId } = await c.req.json().catch(() => ({}));

  if (!fromCurrency || !toCurrency || !amount || !userId) {
    return c.json(
      {
        message: 'Invalid request; missing `fromCurrency`, `toCurrency`, `amount`, or `userId`',
      },
      400,
    );
  }

  return c.json(
    {
      message: 'Conversion successful',
      fromCurrency,
      toCurrency,
      amount: 100,
      transactionId:
        '5kpKvUGgioKNSurev8vy4oevq25C9xnc21eFTpQ2DDkRoDkExnotSFXQdqTuGE4UMzMXcD827P1btUybh1HiTLyH',
      userId,
    },
    200,
  );
});

export default app;
