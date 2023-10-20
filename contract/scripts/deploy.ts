import { ethers } from "hardhat";

async function main() {
  // Hardcoded deploying nonce
  const deployNonce = 36;

  const signer = (await ethers.getSigners())[0];
  const currentNonce = await ethers.provider.getTransactionCount(
    signer.address
  );
  console.log(`Current nonce: ${currentNonce}`);

  if (currentNonce > deployNonce) {
    throw new Error(
      `Current nonce ${currentNonce} is greater than desired nonce ${deployNonce}`
    );
  }

  for (let i = currentNonce; i < deployNonce; i++) {
    const tx = await signer.sendTransaction({
      to: signer.address,
      value: 0,
    });
    await tx.wait();
    console.log(`Nonce ${i} sent`);
  }
  // Now deploy the main contract
  const ContractFactory = await ethers.getContractFactory("PledgePost");
  const contract = await ContractFactory.deploy({ nonce: deployNonce });
  console.log(`Contract deployed at address: ${contract.target}`);

  // Deploy the ERC20 token
  const TokenContractFactory = await ethers.getContractFactory("TestToken");
  const tokenContract = await TokenContractFactory.deploy({
    nonce: deployNonce + 1,
  });
  console.log(`Token deployed at address: ${tokenContract.target}`);
  async function setup() {
    const tx1 = await contract.createRound(
      tokenContract,
      "Initial Round",
      "This is the first round of the PledgePost! Enjoy to write something awesome!",
      1699509663,
      1702101663
    );
    await tx1.wait();
    console.log(`Round 1 created`);
    const tx2 = await contract.activateRound(1);
    await tx2.wait();
    console.log(`Round 1 activated`);
  }
  await setup();
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
npx hardhat verify --network goerli 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
npx hardhat verify --network sepolia 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
npx hardhat verify --network optimismGoerli 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
npx hardhat verify --network polygonMumbai 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
npx hardhat verify --network polygonZkEvmTestnet 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
npx hardhat verify --network scrollSepolia 0x6F62FDD15ce157527416fB4Bf1a9dF0E110Fb6Fb
*/
