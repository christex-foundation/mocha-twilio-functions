import { Connection } from '@solana/web3.js';

export default function getConnection() {
  return new Connection(`${process.env.HELIUS_URL}?api_key=${process.env.HELIUS_API_KEY}`);
}
