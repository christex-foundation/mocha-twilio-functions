//@ts-check
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { TOKEN_PROGRAM_ID, createInitializeAccount3Instruction } from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const USDC_DEVNET_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

const connection = new Connection(clusterApiUrl('devnet'));
const keypair = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');
// use whatsapp phone number as seed
const seed = '23276242792';

const whatsappUserAccount = await PublicKey.createWithSeed(
  keypair.publicKey,
  seed,
  TOKEN_PROGRAM_ID,
);

// create account with seed; assigned to TOKEN_PROGRAM_ID
const accountWithSeedIx = createAccountWithSeed(keypair.publicKey, seed, whatsappUserAccount);

// initialize account as token account for USDC
const initiailizeAccountIx = createInitializeAccount3Instruction(
  whatsappUserAccount,
  USDC_DEVNET_MINT,
  keypair.publicKey,
);

const tx = new Transaction().add(accountWithSeedIx, initiailizeAccountIx);
const sig = await sendAndConfirmTransaction(connection, tx, [keypair]);
console.log('🚀 ~ sig:', sig); // 5LYFs3mMQHdYpXHmPkY3ViBme46UVZbADGWo9Z4CtqXbAqo3BPEGYvSHy5xj9daYd8hfsAZBghK1dpttCKjAhzm4

/**
 * @param {PublicKey} basePubKey
 * @param {string} seed
 * @param {PublicKey} newAccountPubkey
 */
function createAccountWithSeed(basePubKey, seed, newAccountPubkey) {
  const ix = SystemProgram.createAccountWithSeed({
    fromPubkey: basePubKey,
    basePubkey: basePubKey,
    seed,
    newAccountPubkey,
    lamports: LAMPORTS_PER_SOL,
    space: 165, // SPACE FOR TOKEN ACCOUNT .. I THINK
    programId: TOKEN_PROGRAM_ID,
  });

  return ix;
}
