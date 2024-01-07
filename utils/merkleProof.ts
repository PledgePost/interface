import { MerkleTree } from "merkletreejs";

export interface Distribution {
  recipientId: `0x${string}`;
  amount: BigInt;
}
// takes distribution data
// const distributions: Distribution[] = [
//   { recipientId: "0x123...", amount: BigInt(100) },
//   { recipientId: "0x456...", amount: BigInt(200) },
// ];
export async function getMerkleProof({
  distributions,
}: {
  distributions: Distribution[];
}) {
  const keccak256 = require("keccak256");
  // Hash data
  const leaves = distributions.map((d) =>
    keccak256(`${d.recipientId}${d.amount}`)
  );

  // Build the Merkle tree
  const tree = new MerkleTree(leaves, keccak256);

  // Get the Merkle root
  const root = tree.getRoot().toString("hex");

  // Generate the Merkle proof
  const leaf: any = [];
  const proof: any = [];
  for (let i = 0; i < distributions.length; i++) {
    leaf.push(
      keccak256(`${distributions[i].recipientId}${distributions[i].amount}`)
    );
    proof.push(tree.getProof(leaf[i]));
  }
  // console.log(tree.verify(proof, leaf, root));
  const distributionsWithProof = distributions.map((distribution, index) => ({
    index,
    ...distribution,
    merkleProof: proof[index],
  }));

  return {
    root,
    distributionsWithProof,
  };
}
