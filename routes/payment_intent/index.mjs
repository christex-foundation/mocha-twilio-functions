//@ts-check
import { Hono } from "hono";
import { createSupabaseClient } from "../../utils/supabase.mjs";
const app = new Hono();

// Initialize Supabase client
const supabase = createSupabaseClient();

//create payment intent
app.post("/", async (c) => {
  const { from_number } = await c.req.json().catch(() => ({}));

  if (!from_number) {
    return c.json(
      {
        message: "Invalid request; missing `from_number`",
      },
      400
    );
  }

  try {
    // @ts-ignore
    const { data, error } = await supabase
      .from("intents")
      .insert({
        from_number: from_number,
        client_secret: `client_secret_${from_number}`,
      })
      .select();
    if (error) {
      console.log(error);
    }

    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//update payment intent
app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const {
    from_number,
    to_number,
    amount,
    currency,
    description,
    cancelation_reason,
    payment_method,
    amount_received,
  } = await c.req.json().catch(() => ({}));
  const secret = `client_secret_${from_number}`;

  try {
    const { data, error } = await supabase
      .from("intents")
      .update({
        from_number: from_number,
        to_number: to_number,
        amount: amount,
        currency: currency,
        description: description,
        cancelation_reason: cancelation_reason,
        payment_method: payment_method,
        amount_received: amount_received,
      })
      .eq("id", id)
      .eq("client_secret", secret)
      .select();
    if (error) {
      console.log(error);
    }

    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//get payment intents ----- This is not clear are we getting all the client's intent or all the intents in the DB
app.get("/", async (c) => {
  try {
    const { data, error } = await supabase.from("intents").select();
    if (error) {
      console.log(error);
    }

    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//get payment intent by id
app.get("/:id", async (c) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        message: "Invalid request; missing `id`",
      },
      400
    );
  }

  try {
    const { data, error } = await supabase
      .from("intents")
      .select()
      .eq("id", id);
    if (error) {
      console.log(error);
    }

    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//cancel payment intent
app.put("/:id/cancel", async (c) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        message: "Invalid request; missing `id`",
      },
      400
    );
  }

  try {
    const { data, error } = await supabase
      .from("intents")
      .update({
        cancelled_at: new Date(),
        cancellation_reason: "User cancelled",
      })
      .eq("id", id);
    if (error) {
      console.log(error);
    }

    return c.json("Intent cancelled!", 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//confirm payment intent
app.put("/:id/confirm", async (c) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        message: "Invalid request; missing `id`",
      },
      400
    );
  }

  try {
    const { data, error } = await supabase
      .from("intents")
      .update({
        confirmed_at: new Date(),
      })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }

    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

//delete payment intent
app.post("/:id/delete", async (c) => {
  const id = c.req.param("id");

  try {
    if (!id) {
      return c.json(
        {
          message: "Invalid request; missing `id`",
        },
        400
      );
    }

    const { data, error } = await supabase
      .from("intents")
      .delete()
      .eq("id", id);
    if (error) {
      console.log(error);
    }

    return c.json("Intent deleted!", 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

app.post("/search", async (c) => {
  const { query } = await c.req.json().catch(() => ({}));
  console.log(query);

  if (!query) {
    return c.json(
      {
        message: "Invalid request; missing `query`",
      },
      400
    );
  }

  try {
    const { data, error } = await supabase
      .from("intents")
      .select()
      .textSearch("description", `${query}`);
    if (error) {
      console.log(error);
    }
    return c.json(data, 201);
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json(
      {
        message: "Unexpected error occurred",
        error: err.message,
      },
      500
    );
  }
});

export default app;
