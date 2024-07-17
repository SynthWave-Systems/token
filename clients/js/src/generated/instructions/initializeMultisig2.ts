/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  AccountRole,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type InitializeMultisig2Instruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMultisig extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMultisig extends string
        ? WritableAccount<TAccountMultisig>
        : TAccountMultisig,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeMultisig2InstructionData = {
  discriminator: number;
  /** The number of signers (M) required to validate this multisignature account. */
  m: number;
};

export type InitializeMultisig2InstructionDataArgs = {
  /** The number of signers (M) required to validate this multisignature account. */
  m: number;
};

export function getInitializeMultisig2InstructionDataEncoder(): Encoder<InitializeMultisig2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['m', getU8Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 19 })
  );
}

export function getInitializeMultisig2InstructionDataDecoder(): Decoder<InitializeMultisig2InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['m', getU8Decoder()],
  ]);
}

export function getInitializeMultisig2InstructionDataCodec(): Codec<
  InitializeMultisig2InstructionDataArgs,
  InitializeMultisig2InstructionData
> {
  return combineCodec(
    getInitializeMultisig2InstructionDataEncoder(),
    getInitializeMultisig2InstructionDataDecoder()
  );
}

export type InitializeMultisig2Input<TAccountMultisig extends string = string> =
  {
    /** The multisignature account to initialize. */
    multisig: Address<TAccountMultisig>;
    m: InitializeMultisig2InstructionDataArgs['m'];
    signers: Array<Address>;
  };

export function getInitializeMultisig2Instruction<
  TAccountMultisig extends string,
>(
  input: InitializeMultisig2Input<TAccountMultisig>
): InitializeMultisig2Instruction<
  typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMultisig
> {
  // Program address.
  const programAddress = TOKEN_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    multisig: { value: input.multisig ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = args.signers.map((address) => ({
    address,
    role: AccountRole.READONLY,
  }));

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.multisig), ...remainingAccounts],
    programAddress,
    data: getInitializeMultisig2InstructionDataEncoder().encode(
      args as InitializeMultisig2InstructionDataArgs
    ),
  } as InitializeMultisig2Instruction<
    typeof TOKEN_PROGRAM_ADDRESS,
    TAccountMultisig
  >;

  return instruction;
}

export type ParsedInitializeMultisig2Instruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The multisignature account to initialize. */
    multisig: TAccountMetas[0];
  };
  data: InitializeMultisig2InstructionData;
};

export function parseInitializeMultisig2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeMultisig2Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
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
      multisig: getNextAccount(),
    },
    data: getInitializeMultisig2InstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
