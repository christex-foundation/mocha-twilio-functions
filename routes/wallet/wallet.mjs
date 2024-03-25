//@ts-check

import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { getOrCreateUserTokenAccount } from '../../utils/wallet.mjs';
import { getAccount } from '@solana/spl-token';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { config as dotEnvConfig } from 'dotenv';
import BigNumber from 'bignumber.js';

dotEnvConfig();

const MOCHA_KEYPAIR = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');
const connection = new Connection(clusterApiUrl('devnet'));

/**
 * @description Function to fetch the wallet balance
 * @param {string} phoneNumber
 */
export async function fetchWalletBalance(phoneNumber) {
  // fetch wallet balance from the API
  const address = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, phoneNumber);

  const balance = await connection.getTokenAccountBalance(address);

  return balance.value.uiAmount;
}
