//@ts-check

import {
  TOKEN_PROGRAM_ID,
  createInitializeAccount3Instruction,
  getAccount,
} from '@solana/spl-token';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
const USDC_DEVNET_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

/**
 * @description GET the public key of the account with seed, assigned to TOKEN_PROGRAM_ID
 * @returns {Promise<PublicKey>}
 * @param {Keypair} owner
 * @param {string} phoneNumber
 */
export async function getOrCreateUserTokenAccount(owner, phoneNumber) {
  const address = await PublicKey.createWithSeed(owner.publicKey, phoneNumber, TOKEN_PROGRAM_ID);

  let account;
  try {
    account = await getAccount(connection, address, 'processed');
  } catch (error) {
    // create account with seed; assigned to TOKEN_PROGRAM_ID
    const accountWithSeedIx = createAccountWithSeed(owner.publicKey, phoneNumber, address);

    // initialize account as token account for USDC
    const initiailizeAccountIx = createInitializeAccount3Instruction(
      address,
      USDC_DEVNET_MINT,
      owner.publicKey,
    );

    const tx = new Transaction().add(accountWithSeedIx, initiailizeAccountIx);
    await sendAndConfirmTransaction(connection, tx, [owner], {
      skipPreflight: true,
      commitment: 'processed',
    });
  }

  return (await getAccount(connection, address, 'processed')).address;
}

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
    space: 165,
    programId: TOKEN_PROGRAM_ID,
  });

  return ix;
}
