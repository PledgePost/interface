import { ethers } from "ethers";
import {
  DonationVotingABI,
  DonationVotingBytecode,
} from "@/abi/DonationVoting";
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

export async function deployStrategy() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://arbitrum-sepolia.infura.io/v3/cf4f68a2648c42159c880252a44f923b"
  );
  console.log("provider: ", provider);
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
  console.log("Strategy deployed: ", contract.address);
  return contract.address;
}
