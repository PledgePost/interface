import { ethers } from "hardhat";
import { expect } from "chai";

describe("Contract Test", () => {
  let owner: any;
  let addr1: any;
  let addr2: any;

  let contract: any;
  let token: any;
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
    contract = await deployContract();
    token = await deployTokenContract();
  });
  describe("Basic functions", () => {
    it("should post article", async () => {
      await contract.postArticle("test");
      expect(await contract.getAuthorArticle(owner.address, 0)).to.deep.equal([
        0,
        owner.address,
        "test",
        0,
      ]);
    });

    it("should donate", async () => {
      await contract.postArticle("test");
      await token.mint(owner.address, 100);
      await token.approve(contract, 100);
      await contract.donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(100);
    });

    it("should create round", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        1699509663,
        1702101663
      );
      expect(await contract.getRoundLength()).to.equal(1);
    });

    it("should apply round", async () => {
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
  describe("QF related tests", () => {
    it("total donation should be 100", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        1699509663,
        1702101663
      );
      await contract.postArticle("test");
      await token.approve(contract, 200);
      await contract.donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(100);
    });
    it("should donate within round", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        1699509663,
        1702101663
      );
      await contract.postArticle("test");
      await token.approve(contract, 300);
      await token.connect(addr1).mint(addr1.address, 100);
      await token.connect(addr1).approve(contract, 100);
      await contract.donateToArticle(owner.address, 0, token, 100);
      await contract.applyForRound(0, 0);
      await contract.donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(200);
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 0)
      ).to.equal(100);
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(300);
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 0)
      ).to.equal(200);
    });
  });
});
