//@ts-check

import {
  TOKEN_PROGRAM_ID,
  createInitializeAccount3Instruction,
  getAccount,
} from '@solana/spl-token';

import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import getConnection from './connection.mjs';

const connection = getConnection();
// @ts-ignore
const USDC_MINT = new PublicKey(process.env.USDC_MINT);

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
      USDC_MINT,
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
