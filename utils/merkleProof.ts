import { Distribution } from "@/app/manager/page";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// takes distribution data
// const distributions: Distribution[] = [
//   { recipientId: "0x123...", amount: BigInt(100) },
//   { recipientId: "0x456...", amount: BigInt(200) },
// ];
export async function getMerkleProof({ distributions }: { distributions: [] }) {
  // Build the Merkle tree
  const tree = StandardMerkleTree.of(distributions, ["address", "uint256"]);

  // Get the Merkle root
  const root = tree.root;
  console.log("merkleroot", root);

  // Generate the Merkle proof
  const distributionsWithProof: Distribution[] = [];

  for (let i = 0; i < distributions.length; i++) {
    const index = i;
    const recipientId = distributions[i][0];
    const amount = distributions[i][1];
    const proof = tree.getProof(distributions[i]);
    const verified = StandardMerkleTree.verify(
      root,
      ["address", "uint256"],
      distributions[i],
      proof
    );
    console.log("verified", verified);
    distributionsWithProof.push({
      index,
      recipientId,
      amount,
      proof,
    });
  }

  return {
    root,
    distributionsWithProof,
  };
}
