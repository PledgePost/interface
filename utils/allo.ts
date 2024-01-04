// Importy Allo from SDK
import { Allo, Registry } from "@allo-team/allo-v2-sdk/";

// Create a new Allo instance
export const allo = new Allo({
  chain: 421614,
  rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
});

// Create a new Registry instance
export const registry = new Registry({
  chain: 421614,
  rpc: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
});
