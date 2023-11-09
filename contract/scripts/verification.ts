import { ethers } from "hardhat";
async function main() {
  let eas_contract = "0x4200000000000000000000000000000000000021"; // OPTIMISM
  const ContractFactory = await ethers.getContractFactory("EASVerification");
  const contract = await ContractFactory.deploy(eas_contract);
  console.log(`Contract deployed at address: ${contract.target}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// npx hardhat run scripts/verification.ts --network optimism
// npx hardhat verify --network optimism
