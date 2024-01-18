// Importy Allo from SDK
import { Allo, MicroGrantsStrategy, Registry } from "@allo-team/allo-v2-sdk/";

export const chainConfig = {
  chain: 421614,
  rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
  // chain: 420,
  // rpc: `https://optimism-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID!}`,
};
// Create a new Allo instance
export const allo = new Allo(chainConfig);

// Create a new Registry instance
export const registry = new Registry(chainConfig);

// create a strategy instance
export const strategy = new MicroGrantsStrategy(chainConfig);
