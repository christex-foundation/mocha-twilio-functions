//@ts-check
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  TOKEN_PROGRAM_ID,
  createInitializeAccount3Instruction,
  getOrCreateAssociatedTokenAccount,
  transfer,
  transferChecked,
} from '@solana/spl-token';

import {
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const USDC_DEVNET_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

const connection = new Connection(clusterApiUrl('devnet'));
const keypair = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');
// use whatsapp phone number as seed
const seed = '23276242792';

const whatsappUserAccount = PublicKey.createWithSeed(keypair.publicKey, seed, TOKEN_PROGRAM_ID);

// create account with seed; assigned to TOKEN_PROGRAM_ID
const createAccountWithSeedIx = createAccountWithSeed();

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
