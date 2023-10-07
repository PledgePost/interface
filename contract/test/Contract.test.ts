import { ethers } from "hardhat";
import { expect } from "chai";

describe("ArticlePlatform", () => {
  let owner: any;
  let addr1: any;
  let addr2: any;

  async function deployContract() {
    const ContractFactory = await ethers.getContractFactory("ArticlePlatform");
    const contract = await ContractFactory.deploy();

    return contract;
  }
  async function deployTokenContract() {
    const TokenFactory = await ethers.getContractFactory("TestToken");
    const token = await TokenFactory.deploy();
    return token;
  }
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("PostArticle", () => {
    it("should post article", async () => {
      const contract = await deployContract();
      await contract.postArticle("test");

      expect(await contract.getAuthorArticle(addr1.address)).to.equal("test");
    });
  });

  describe("Donate", () => {
    it("should donate", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      await contract.postArticle("test");
      await token.mint(owner.address, 100);
      await token.approve(contract.address, 100);
      await contract.donateToArticle();
    });
  });
});
