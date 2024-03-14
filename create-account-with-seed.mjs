//@ts-check

import { PublicKey, SystemProgram } from '@solana/web3.js';

async function createAccountWithSeed(publicKey, seed) {
  return PublicKey.createWithSeed(publicKey, seed, SystemProgram.programId);
}

const publicKey = new PublicKey('mocaZZMpdRcFpcigpbFyGyqaRiWaGDcbSM1xrM9ZHjo');
const testKey = await createAccountWithSeed(publicKey, '+23276242792');
console.log(testKey.toBase58());
