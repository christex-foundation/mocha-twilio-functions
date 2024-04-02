//@ts-check

import getConnection from '../../utils/connection.mjs';
import { getOrCreateUserTokenAccount } from '../../utils/wallet.mjs';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';

const MOCHA_KEYPAIR = Keypair.fromSecretKey(
  // @ts-ignore
  Uint8Array.from(JSON.parse(process.env.MOCHA_SECRET_KEY)),
);
const connection = getConnection();

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
