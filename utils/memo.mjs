//@ts-check

import { PublicKey, TransactionInstruction } from '@solana/web3.js';

/** @internal */
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

/**
 * @description Add a memo to a transaction
 * @param {string} memo
 * @returns {TransactionInstruction}
 */
function addMemo(memo) {
  return new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [],
    data: Buffer.from(memo, 'utf8'),
  });
}
