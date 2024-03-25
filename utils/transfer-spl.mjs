//@ts-check

import { config as dotEnvConfig } from 'dotenv';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { getOrCreateUserTokenAccount } from './wallet.mjs';
import { transfer } from '@solana/spl-token';
import { Connection, clusterApiUrl } from '@solana/web3.js';

dotEnvConfig();

const connection = new Connection(clusterApiUrl('devnet'));
const MOCHA_KEYPAIR = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');

/**
 * @param {string} fromNumber
 * @param {string} toNumber
 * @param {number} amount
 * @returns {Promise<string>}
 * @description Transfer USDC from one user to another
 *
 */
export async function transferUSDC(fromNumber, toNumber, amount) {
  const fromWhatsappUserAccount = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, fromNumber);
  const toWhatsappUserAccount = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, toNumber);

  return await transfer(
    connection,
    MOCHA_KEYPAIR,
    fromWhatsappUserAccount,
    toWhatsappUserAccount,
    MOCHA_KEYPAIR,
    amount,
  );
}
