import { ethers, run } from "hardhat";

async function main() {
  // Hardcoded deploying nonce
  const deployNonce = 3; // Adjust this to your needs

  const signer = (await ethers.getSigners())[0];

  // Check if signer nonce matches desired nonce
  const nonce = await ethers.provider.getTransactionCount(signer.address);
  if (nonce !== deployNonce) {
    throw new Error(
      `Signer nonce ${nonce} is different from desired nonce ${deployNonce}`
    );
  }

  // Now deploy the main contract
  const ContractFactory = await ethers.getContractFactory("PledgePost");
  const contract = await ContractFactory.deploy({ nonce: deployNonce });

  console.log(`Contract deployed at address: ${contract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
/*
npx hardhat run scripts/deploy.ts --network goerli
npx hardhat run scripts/deploy.ts --network sepolia
npx hardhat run scripts/deploy.ts --network optimismGoerli
npx hardhat run scripts/deploy.ts --network polygonMumbai
npx hardhat run scripts/deploy.ts --network polygonZkEvmTestnet
npx hardhat run scripts/deploy.ts --network scrollSepolia
*/
/*
npx hardhat verify --network goerli 0x44CA47095F1E18548CB5Fb04499c8A0d4199a30a
npx hardhat verify --network sepolia 0x44CA47095F1E18548CB5Fb04499c8A0d4199a30a
npx hardhat verify --network optimismGoerli 0x44CA47095F1E18548CB5Fb04499c8A0d4199a30a
npx hardhat verify --network polygonMumbai 0x44CA47095F1E18548CB5Fb04499c8A0d4199a30a
npx hardhat verify --network polygonZkEvmTestnet 0x44CA47095F1E18548CB5Fb04499c8A0d4199a30a
npx hardhat verify --network scrollSepolia
*/
