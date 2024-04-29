import { getCreateAccountInstruction } from '@solana-program/system';
import {
  Account,
  appendTransactionMessageInstructions,
  generateKeyPairSigner,
  none,
  pipe,
} from '@solana/web3.js';
import test from 'ava';
import {
  AccountState,
  TOKEN_PROGRAM_ADDRESS,
  Token,
  fetchToken,
  getInitializeAccountInstruction,
  getTokenSize,
} from '../src/index.js';
import {
  createDefaultSolanaClient,
  createDefaultTransaction,
  createMint,
  generateKeyPairSignerWithSol,
  signAndSendTransaction,
} from './_setup.js';

test('it creates and initializes a new token account', async (t) => {
  // Given a mint account, its mint authority and two generated keypairs
  // for the token to be created and its owner.
  const client = createDefaultSolanaClient();
  const [mintAuthority, token, owner] = await Promise.all([
    generateKeyPairSignerWithSol(client),
    generateKeyPairSigner(),
    generateKeyPairSigner(),
  ]);
  const mint = await createMint(client, mintAuthority);

  // When we create and initialize a token account at this address.
  const space = BigInt(getTokenSize());
  const rent = await client.rpc.getMinimumBalanceForRentExemption(space).send();
  const instructions = [
    getCreateAccountInstruction({
      payer: mintAuthority,
      newAccount: token,
      lamports: rent,
      space,
      programAddress: TOKEN_PROGRAM_ADDRESS,
    }),
    getInitializeAccountInstruction({
      account: token.address,
      mint,
      owner: owner.address,
    }),
  ];
  await pipe(
    await createDefaultTransaction(client, mintAuthority),
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Then we expect the token account to exist and have the following data.
  const tokenAccount = await fetchToken(client.rpc, token.address);
  t.like(tokenAccount, <Account<Token>>{
    address: token.address,
    data: {
      mint,
      owner: owner.address,
      amount: 0n,
      delegate: none(),
      state: AccountState.Initialized,
      isNative: none(),
      delegatedAmount: 0n,
      closeAuthority: none(),
    },
  });
});
