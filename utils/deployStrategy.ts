import { ethers } from "ethers";
import {
  DonationVotingABI,
  DonationVotingBytecode,
} from "@/abi/DonationVoting";

export async function deployStrategy() {
  const privateKey = process.env.PRIVATE_KEY!;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://arbitrum-sepolia.infura.io/v3/cf4f68a2648c42159c880252a44f923b"
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  const ContractFactory = new ethers.ContractFactory(
    DonationVotingABI,
    DonationVotingBytecode,
    wallet
  );
  const args = [
    "0x1133eA7Af70876e64665ecD07C0A0476d09465a1", //Allo address
    "PledgePostDonationTransferStrategy", //Strategy name
    "0x000000000022D473030F116dDEE9F6B43aC78BA3", //Permit2
  ];
  const contract = await ContractFactory.deploy(...args);
  await contract.deployed();
  console.log(contract.address);
  return contract.address;
}
