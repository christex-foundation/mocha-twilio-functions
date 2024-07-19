//@ts-check

exports.handler = async function (context, { amount }, callback) {
  const amountInCents = amount * 100;

  callback(null, { amount: amountInCents });
};
