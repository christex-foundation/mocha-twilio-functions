//@ts-check

import { transferUSDC } from '../../utils/transfer-spl.mjs';

/**
 * @param {string} fromNumber
 * @param {string} toNumber
 * @param {number} amount
 * @returns {Promise<string>}
 */
export async function transfer(fromNumber, toNumber, amount) {
  // run validation
  // TODO: validate numbers
  // https://twilio.com/docs/lookup/quickstart
  //https://www.twilio.com/docs/glossary/what-e164
  console.log(`Transferrring USDC`);
  // call transfer
  return transferUSDC(fromNumber, toNumber, amount);
}
