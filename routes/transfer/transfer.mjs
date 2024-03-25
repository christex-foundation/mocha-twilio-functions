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

  // call transfer
  return transferUSDC(fromNumber, toNumber, amount);
}
