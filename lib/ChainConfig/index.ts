export const ChainConfig = {
  10: {
    hex: "0xa",
    token: "ETH",
    label: "Optimism",
    shortName: "opt",
    rpcUrl: `https://optimism-mainnet.infura.io/v3/${process.env
      .NEXT_PUBLIC_INFURA_ID!}`,
    blockExplorerUrl: "https://optimistic.etherscan.io",
  },
  420: {
    hex: "0x1a4",
    token: "gETH",
    label: "Optimism Goerli",
    shortName: "opt",
    rpcUrl: `https://optimism-goerli.infura.io/v3/${process.env
      .NEXT_PUBLIC_INFURA_ID!}`,
    blockExplorerUrl: "https://goerli-optimistic.etherscan.io",
  },
};
