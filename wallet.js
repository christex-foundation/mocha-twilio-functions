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

const connection = new Connection(clusterApiUrl('devnet'));
const keypair = await getKeypairFromEnvironment('MOCHA_SECRET_KEY');
