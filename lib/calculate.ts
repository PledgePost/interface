import { ethers } from "ethers";

type Amount = {
  amount?: number;
};

export function calculateAmount(amounts: any[]) {
  let x = ethers.BigNumber.from(0);

  if (amounts) {
    for (let i = 0; i < amounts.length; i++) {
      x = x.add(ethers.BigNumber.from(amounts[i].amount));
    }
  }
  return x.toNumber();
}
