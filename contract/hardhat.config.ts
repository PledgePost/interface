import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();
const providerApiKey = process.env.PROVIDER_API_KEY as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/{providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimismGoerli: {
      url: `https://optimism-goerli.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonZkEvm: {
      url: "https://zkevm-rpc.com",
      accounts: [deployerPrivateKey],
    },
    polygonZkEvmTestnet: {
      url: "https://polygonzkevm-testnet.g.alchemy.com/v2/demo",
      accounts: [deployerPrivateKey],
    },
		scrollSepolia: {
			url:'https://sepolia-rpc.scroll.io',
			accounts: [deployerPrivateKey],
  },
  etherscan: {
    apiKey: etherscanApiKey,
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
    ],
  },
};

export default config;
