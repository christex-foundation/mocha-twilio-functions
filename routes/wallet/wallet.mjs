//@ts-check

import { getOrCreateUserTokenAccount } from '../../utils/wallet.mjs';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const MOCHA_KEYPAIR = process.env.MOCHA_SECRET_KEY;
const connection = new Connection(clusterApiUrl('devnet'));

/**
 * @description Function to fetch the wallet balance
 * @param {string} phoneNumber
 */
export async function fetchWalletBalance(phoneNumber) {
  // @ts-ignore
  const address = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, phoneNumber);
  const balance = await connection.getTokenAccountBalance(address, 'processed');

  return balance.value.uiAmount;
}
