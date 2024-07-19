//@ts-check

/**
 * Handle final confirmation of cash-out request
 */
exports.handler = async function (context, event, callback) {
  // Confirm cash-out request
  // If agent, your cash out is confirmed, an agent will be in touch with you
  // If OM, orange money cash out initiated
  // Send confirmation message after

  // TODO: Update amount_received in cash out intent
  // cash-out intent is only confirmed once agent confirms / OM confirms
  callback(null, {
    responseMessage: `confirmation handler`,
  });
};
