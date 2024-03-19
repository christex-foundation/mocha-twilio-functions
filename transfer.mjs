// @ts-check
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

// USDC Mint address on Devnet
const USDC_DEVNET_MINT = new PublicKey(process.env.USDC_MINT);
const connection = new Connection(clusterApiUrl('devnet'));
const keypair = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');

console.log(await transferSPL('23276242792'));

/**
 * @description Transfer 1 USDC to an account
 * @returns {Promise<string>}
 * @param {string} phoneNumber
 */
async function transferSPL(phoneNumber) {
  // use whatsapp phone number as seed
  const whatsappUserAccount = await getUserTokenAccount(phoneNumber);

  // IF; sending to a non-whatsapp otherwise used `getUserTokenAccount`
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    USDC_DEVNET_MINT,
    new PublicKey('7z7Q3UH4cMxSNDTATsQcC34rr4MVA9ydqpbeqnU4q7ba'),
  );

  return await transfer(
    connection,
    keypair,
    whatsappUserAccount,
    toTokenAccount.address,
    keypair,
    1,
  );
}

/**
 * @description GET the public key of the account with seed, assigned to TOKEN_PROGRAM_ID
 * @returns {Promise<PublicKey>}
 * @param {string} phoneNumber
 */
async function getUserTokenAccount(phoneNumber) {
  return await PublicKey.createWithSeed(keypair.publicKey, phoneNumber, TOKEN_PROGRAM_ID);
}
