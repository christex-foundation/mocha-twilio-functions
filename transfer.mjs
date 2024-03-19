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
// use whatsapp phone number as seed
const seed = '23276242792';

// GET the public key of the account with seed, assigned to TOKEN_PROGRAM_ID
const whatsappUserAccount = await PublicKey.createWithSeed(
  keypair.publicKey,
  seed,
  TOKEN_PROGRAM_ID,
);

console.log(await transferSPL());

/**
 * @description Transfer 1 USDC to an account
 * @returns {Promise<string>}
 */
async function transferSPL() {
  // IF; sending to a non-whatsapp user other wise same code as line 17
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
