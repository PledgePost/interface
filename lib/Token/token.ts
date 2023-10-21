export type TokenType = {
  symbol: string;
  address: any;
  decimals: number;
};
export const TokenConfig: TokenType[] = [
  {
    symbol: "USDC",
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    decimals: 18,
  },
];
