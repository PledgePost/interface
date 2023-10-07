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
      expect(await contract.getAuthorArticle(owner.address, 0)).to.deep.equal([
        0,
        owner.address,
        "test",
        0,
      ]);
    });
  });

  describe("Donate", () => {
    it("should donate", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      await contract.postArticle("test");
      await token.mint(owner.address, 100);
      await token.approve(contract, 100);
      await contract.donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(100);
    });
  });
  describe("CreateRound", () => {
    it("should create round", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      expect(await contract.getRoundLength()).to.equal(0);
      await contract.createRound(
        token,
        "Initial Round",
        1699509663,
        1702101663
      );
      expect(await contract.getRoundLength()).to.equal(1);
    });
  });
  describe("ApplyRound", () => {
    it("should apply round", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      await contract.createRound(
        token,
        "Initial Round",
        1699509663,
        1702101663
      );
      await contract.postArticle("test");
      await contract.applyForRound(0, 0);
      const round0 = await contract.getRound(0);
      expect(await contract.getRoundArticle(0)).to.deep.equal(round0);
    });
  });
});
