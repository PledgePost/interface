import Chain from "./chaintype";

export const gnosisChain: Chain = {
  id: 100,
  hex: "0x64",
  token: "xDai",
  shortName: "gno",
  label: "Gnosis Chain",
  rpcUrl: "https://rpc.gnosischain.com",
  blockExplorerUrl: "https://gnosisscan.io",
  color: "#3e6957",
  transactionServiceUrl: "https://safe-transaction-gnosis-chain.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};

export const goerliChain: Chain = {
  id: 5,
  hex: "0x5",
  token: "gETH",
  label: "Goerli",
  shortName: "gor",
  rpcUrl: "https://goerli.infura.io/v3/cf4f68a2648c42159c880252a44f923b",
  blockExplorerUrl: "https://goerli.etherscan.io",
  color: "#fbc02d",
  transactionServiceUrl: "https://safe-transaction-goerli.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: true,
  paymaster: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_GOERLI,
};

export const mainnetChain: Chain = {
  id: 1,
  hex: "0x1",

  token: "ETH",
  label: "Ethereum",
  shortName: "eth",
  rpcUrl: "https://mainnet.infura.io/v3/{providerApiKey}",
  blockExplorerUrl: "https://etherscan.io",
  color: "#DDDDDD",
  transactionServiceUrl: "https://safe-transaction-mainnet.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};

export const polygonChain: Chain = {
  id: 137,
  hex: "0x89",
  token: "matic",
  shortName: "matic",
  label: "Polygon",
  rpcUrl: "https://polygon-rpc.com",
  blockExplorerUrl: "https://polygonscan.com",
  color: "#8248E5",
  transactionServiceUrl: "https://safe-transaction-polygon.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
  paymaster: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_POLYGONPOS,
};

export const mumbaiChain: Chain = {
  id: 80001,
  hex: "0x13881",
  token: "matic",
  shortName: "matic",
  label: "Mumbai",
  rpcUrl:
    "https://polygon-mumbai.infura.io/v3/cf4f68a2648c42159c880252a44f923b",
  blockExplorerUrl: "https://mumbai.polygonscan.com",
  color: "#8248E5",
  isStripePaymentsEnabled: true,
  isMoneriumPaymentsEnabled: false,
  faucetUrl: "https://mumbaifaucet.com/",
  paymaster: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_MUMBAI,
};
export const polygonZkEVMTestnet: Chain = {
  id: 1442,
  hex: "0x5a2",

  token: "ETH",
  label: "Polygon ZK-EVM Testnet",
  shortName: "zkTest",
  rpcUrl: "https://rpc.public.zkevm-test.net",
  blockExplorerUrl: "https://testnet-zkevm.polygonscan.com",
  paymaster: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_ZKEVM_TESTNET,
};
export const polygonZkEVM: Chain = {
  id: 1101,
  hex: "0x44d",
  token: "zkMATIC",
  label: "Polygon ZK-EVM",
  shortName: "zk",
  rpcUrl: "https://zkevm-rpc.com/",
  transactionServiceUrl: "https://safe-transaction-zkevm.safe.global",
  blockExplorerUrl: "https://zkevm.polygonscan.com/",
};

export const optimismChain: Chain = {
  id: 10,
  hex: "0xa",
  token: "ETH",
  label: "Optimism",
  shortName: "opt",
  rpcUrl:
    "https://optimism-mainnet.infura.io/v3/cf4f68a2648c42159c880252a44f923b",
  blockExplorerUrl: "https://optimistic.etherscan.io",
  color: "#fbb040",
  transactionServiceUrl: "https://safe-transaction-optimism.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};
export const optimismGoerliChain: Chain = {
  id: 420,
  hex: "0x1a4",
  token: "gETH",
  label: "Optimism Goerli",
  shortName: "opt",
  rpcUrl:
    "https://optimism-goerli.infura.io/v3/cf4f68a2648c42159c880252a44f923b",
  blockExplorerUrl: "https://goerli-optimistic.etherscan.io",
  paymaster: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_OP_GOERLI,
};
export const chains: Chain[] = [
  gnosisChain,
  goerliChain,
  mainnetChain,
  mumbaiChain,
  polygonChain,
  polygonZkEVMTestnet,
  polygonZkEVM,
  optimismChain,
  optimismGoerliChain,
];

export const initialChain = mumbaiChain;

export default chains;
