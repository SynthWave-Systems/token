/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { findAssociatedTokenPda } from '../pdas';
import { ASSOCIATED_TOKEN_PROGRAM_ADDRESS } from '../programs';
import {
  ResolvedAccount,
  expectAddress,
  getAccountMetaFactory,
} from '../shared';

export type CreateAssociatedTokenIdempotentInstruction<
  TProgram extends string = typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAta extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountAta extends string ? WritableAccount<TAccountAta> : TAccountAta,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CreateAssociatedTokenIdempotentInstructionData = {
  discriminator: number;
};

export type CreateAssociatedTokenIdempotentInstructionDataArgs = {};

export function getCreateAssociatedTokenIdempotentInstructionDataEncoder(): Encoder<CreateAssociatedTokenIdempotentInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 1 })
  );
}

export function getCreateAssociatedTokenIdempotentInstructionDataDecoder(): Decoder<CreateAssociatedTokenIdempotentInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCreateAssociatedTokenIdempotentInstructionDataCodec(): Codec<
  CreateAssociatedTokenIdempotentInstructionDataArgs,
  CreateAssociatedTokenIdempotentInstructionData
> {
  return combineCodec(
    getCreateAssociatedTokenIdempotentInstructionDataEncoder(),
    getCreateAssociatedTokenIdempotentInstructionDataDecoder()
  );
}

export type CreateAssociatedTokenIdempotentAsyncInput<
  TAccountPayer extends string = string,
  TAccountAta extends string = string,
  TAccountOwner extends string = string,
  TAccountMint extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Funding account (must be a system account). */
  payer: TransactionSigner<TAccountPayer>;
  /** Associated token account address to be created. */
  ata?: Address<TAccountAta>;
  /** Wallet address for the new associated token account. */
  owner: Address<TAccountOwner>;
  /** The token mint for the new associated token account. */
  mint: Address<TAccountMint>;
  /** System program. */
  systemProgram?: Address<TAccountSystemProgram>;
  /** SPL Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export async function getCreateAssociatedTokenIdempotentInstructionAsync<
  TAccountPayer extends string,
  TAccountAta extends string,
  TAccountOwner extends string,
  TAccountMint extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
>(
  input: CreateAssociatedTokenIdempotentAsyncInput<
    TAccountPayer,
    TAccountAta,
    TAccountOwner,
    TAccountMint,
    TAccountSystemProgram,
    TAccountTokenProgram
  >
): Promise<
  CreateAssociatedTokenIdempotentInstruction<
    typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountAta,
    TAccountOwner,
    TAccountMint,
    TAccountSystemProgram,
    TAccountTokenProgram
  >
> {
  // Program address.
  const programAddress = ASSOCIATED_TOKEN_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    ata: { value: input.ata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.ata.value) {
    accounts.ata.value = await findAssociatedTokenPda({
      owner: expectAddress(accounts.owner.value),
      tokenProgram: expectAddress(accounts.tokenProgram.value),
      mint: expectAddress(accounts.mint.value),
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.ata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getCreateAssociatedTokenIdempotentInstructionDataEncoder().encode({}),
  } as CreateAssociatedTokenIdempotentInstruction<
    typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountAta,
    TAccountOwner,
    TAccountMint,
    TAccountSystemProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type CreateAssociatedTokenIdempotentInput<
  TAccountPayer extends string = string,
  TAccountAta extends string = string,
  TAccountOwner extends string = string,
  TAccountMint extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Funding account (must be a system account). */
  payer: TransactionSigner<TAccountPayer>;
  /** Associated token account address to be created. */
  ata: Address<TAccountAta>;
  /** Wallet address for the new associated token account. */
  owner: Address<TAccountOwner>;
  /** The token mint for the new associated token account. */
  mint: Address<TAccountMint>;
  /** System program. */
  systemProgram?: Address<TAccountSystemProgram>;
  /** SPL Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getCreateAssociatedTokenIdempotentInstruction<
  TAccountPayer extends string,
  TAccountAta extends string,
  TAccountOwner extends string,
  TAccountMint extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
>(
  input: CreateAssociatedTokenIdempotentInput<
    TAccountPayer,
    TAccountAta,
    TAccountOwner,
    TAccountMint,
    TAccountSystemProgram,
    TAccountTokenProgram
  >
): CreateAssociatedTokenIdempotentInstruction<
  typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
  TAccountPayer,
  TAccountAta,
  TAccountOwner,
  TAccountMint,
  TAccountSystemProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = ASSOCIATED_TOKEN_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    ata: { value: input.ata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.ata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getCreateAssociatedTokenIdempotentInstructionDataEncoder().encode({}),
  } as CreateAssociatedTokenIdempotentInstruction<
    typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountAta,
    TAccountOwner,
    TAccountMint,
    TAccountSystemProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedCreateAssociatedTokenIdempotentInstruction<
  TProgram extends string = typeof ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Funding account (must be a system account). */
    payer: TAccountMetas[0];
    /** Associated token account address to be created. */
    ata: TAccountMetas[1];
    /** Wallet address for the new associated token account. */
    owner: TAccountMetas[2];
    /** The token mint for the new associated token account. */
    mint: TAccountMetas[3];
    /** System program. */
    systemProgram: TAccountMetas[4];
    /** SPL Token program. */
    tokenProgram: TAccountMetas[5];
  };
  data: CreateAssociatedTokenIdempotentInstructionData;
};

export function parseCreateAssociatedTokenIdempotentInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateAssociatedTokenIdempotentInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      payer: getNextAccount(),
      ata: getNextAccount(),
      owner: getNextAccount(),
      mint: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getCreateAssociatedTokenIdempotentInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
