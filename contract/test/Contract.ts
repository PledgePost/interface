import { ethers } from "hardhat";
import { expect } from "chai";

describe("Contract Test", () => {
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addr3: any;
  let addr4: any;

  let contract: any;
  let token: any;

  async function deployContract() {
    const ContractFactory = await ethers.getContractFactory("PledgePost");
    const contract = await ContractFactory.deploy();
    return contract;
  }
  async function deployTokenContract() {
    const TokenFactory = await ethers.getContractFactory("TestToken");
    const token = await TokenFactory.deploy();
    return token;
  }

  beforeEach(async () => {
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
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
      await token.mint(addr1.address, 100);
      await token.connect(addr1).approve(contract, 100);
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(100);
      expect(
        await contract.checkOwner(addr1.address, owner.address, 0)
      ).to.equal(true);
    });

    it("should create round", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      expect(await contract.getRoundLength()).to.equal(1);
    });

    it("should apply round", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      await contract.postArticle("test");
      await contract.activateRound(1);
      await contract.applyForRound(1, 0);
      const round1 = await contract.getRound(1);
      expect(await contract.getAppliedRound(owner.address, 0)).to.deep.equal(
        round1
      );
    });
  });
  describe("QF related tests", () => {
    it("total donation should be 100", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      await contract.activateRound(1);
      await contract.postArticle("test");
      await token.mint(owner.address, 100);
      await token.approve(contract, 100);
      await contract.donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(100);
    });
    it("should donate within round", async () => {
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      await contract.postArticle("test");
      await token.mint(owner.address, 200);
      await token.approve(contract, 200);
      await token.connect(addr1).mint(addr1.address, 100);
      await token.connect(addr1).approve(contract, 100);
      await contract.donateToArticle(owner.address, 0, token, 100);
      await contract.activateRound(1);
      await contract.applyForRound(1, 0);
      await contract.donateToArticle(owner.address, 0, token, 100);
      const sqrt100 = await contract.getSquareRoot(100);

      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(200);
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 1)
      ).to.equal(sqrt100);
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, 100);
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(300);
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 1)
      ).to.equal(sqrt100 + sqrt100);
    });

    it("should Allocate", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      await contract.activateRound(1);
      await contract.postArticle("test");
      await token.connect(addr1).mint(addr1.address, ethers.parseEther("300"));
      await token.connect(addr1).approve(contract, ethers.parseEther("300"));
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, ethers.parseEther("100"));
      await contract.applyForRound(1, 0);
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, ethers.parseEther("100"));
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(
        ethers.parseEther("200")
      );
      const sqrt100 = await contract.getSquareRoot(ethers.parseEther("100"));
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 1)
      ).to.equal(sqrt100);
      await contract
        .connect(addr1)
        .donateToArticle(owner.address, 0, token, ethers.parseEther("100"));
      expect(await contract.getDonatedAmount(owner.address, 0)).to.equal(
        ethers.parseEther("300")
      );
      expect(
        await contract.getRecievedDonationsWithinRound(owner.address, 0, 1)
      ).to.equal(sqrt100 + sqrt100);
      const round = await contract.getRound(1);
      await token.mint(owner.address, ethers.parseEther("100"));
      await token.approve(contract, ethers.parseEther("100"));
      await contract.deposit(1, ethers.parseEther("100"));
      const beforeBalance = await token.balanceOf(owner.address);
      await contract.Allocate(1);
      const recievedAllocation = await contract.getAllocation(
        1,
        owner.address,
        0
      );
      const total = beforeBalance + recievedAllocation;
      expect(await token.balanceOf(round.poolAddress)).to.equal(0);
      expect(await token.balanceOf(owner.address)).to.equal(total);
    });
    it("should allocate multiple article", async () => {
      const contract = await deployContract();
      const token = await deployTokenContract();
      await contract.createRound(
        token,
        "Initial Round",
        "This is the first round of the PledgePost! Enjoy to write something awesome!",
        1699509663,
        1702101663
      );
      await contract.activateRound(1);
      // post articles
      await contract.postArticle("test");
      await contract.connect(addr1).postArticle("addr1");
      await contract.connect(addr2).postArticle("addr2");
      await contract.connect(addr3).postArticle("addr3");
      await contract.connect(addr3).postArticle("addr3 again");

      // donate to article
      await token.mint(addr4.address, ethers.parseEther("10000"));
      await token.connect(addr4).approve(contract, ethers.parseEther("10000"));
      await contract
        .connect(addr4)
        .donateToArticle(owner.address, 0, token, ethers.parseEther("100"));
      await contract
        .connect(addr4)
        .donateToArticle(addr1.address, 0, token, ethers.parseEther("100"));
      await contract
        .connect(addr4)
        .donateToArticle(addr2.address, 0, token, ethers.parseEther("100"));
      await contract
        .connect(addr4)
        .donateToArticle(addr3.address, 0, token, ethers.parseEther("100"));

      // apply for round
      await contract.connect(addr1).applyForRound(1, 0);
      await contract.connect(addr2).applyForRound(1, 0);
      await contract.connect(addr3).applyForRound(1, 0);
      await contract.connect(addr3).applyForRound(1, 1);
      await contract.applyForRound(1, 0);

      await contract
        .connect(addr4)
        .donateToArticle(addr1.address, 0, token, ethers.parseEther("1000"));
      await contract
        .connect(addr4)
        .donateToArticle(addr2.address, 0, token, ethers.parseEther("500"));
      await contract
        .connect(addr4)
        .donateToArticle(addr2.address, 0, token, ethers.parseEther("500"));
      await contract
        .connect(addr4)
        .donateToArticle(addr3.address, 0, token, ethers.parseEther("250"));
      await contract
        .connect(addr4)
        .donateToArticle(addr3.address, 0, token, ethers.parseEther("250"));
      await contract
        .connect(addr4)
        .donateToArticle(addr3.address, 1, token, ethers.parseEther("250"));
      await contract
        .connect(addr4)
        .donateToArticle(addr3.address, 1, token, ethers.parseEther("250"));

      const round = await contract.getRound(1);
      await contract.connect(addr4).deposit(1, ethers.parseEther("1000"));
      const ownerbalance = await token.balanceOf(owner.address);
      const addr1balance = await token.balanceOf(addr1.address);
      const addr2balance = await token.balanceOf(addr2.address);
      const addr3balance = await token.balanceOf(addr3.address);
      const addr4balance = await token.balanceOf(addr4.address);
      const poolbalance = await token.balanceOf(round.poolAddress);
      console.log("before owner balance: ", ownerbalance);
      console.log("before addr1 balance: ", addr1balance);
      console.log("before addr2 balance: ", addr2balance);
      console.log("before addr3 balance: ", addr3balance);
      console.log("before addr4 balance: ", addr4balance);
      console.log("before pool balance: ", poolbalance);
      await contract.Allocate(1);
      expect(await token.balanceOf(addr1.address)).to.equal(
        addr1balance + (await contract.getAllocation(1, addr1.address, 0))
      );
      expect(await token.balanceOf(addr2.address)).to.equal(
        addr2balance + (await contract.getAllocation(1, addr2.address, 0))
      );
      expect(await token.balanceOf(addr3.address)).to.equal(
        addr3balance +
          (await contract.getAllocation(1, addr3.address, 0)) +
          (await contract.getAllocation(1, addr3.address, 1))
      );

      console.log(
        "Allocation: ",
        await contract.getAllocation(1, owner.address, 0)
      );
      console.log(
        "Allocation1: ",
        await contract.getAllocation(1, addr1.address, 0)
      );
      console.log(
        "Allocation2: ",
        await contract.getAllocation(1, addr2.address, 0)
      );
      console.log(
        "Allocation3: ",
        await contract.getAllocation(1, addr3.address, 0)
      );
      console.log(
        "Allocation3: ",
        await contract.getAllocation(1, addr3.address, 1)
      );
      console.log("owner balance: ", await token.balanceOf(owner.address));
      console.log("addr1 balance: ", await token.balanceOf(addr1.address));
      console.log("addr2 balance: ", await token.balanceOf(addr2.address));
      console.log("addr3 balance: ", await token.balanceOf(addr3.address));
      console.log("addr4 balance: ", await token.balanceOf(addr4.address));
      console.log("pool balance: ", await token.balanceOf(round.poolAddress));
      // console.log(
      //   "getMatchingAmount",
      //   await contract.getMatchingAmount(0, addr1.address, 0)
      // );
      // console.log(
      //   "estimated Amount: ",
      //   await contract.getEstimatedAmount(
      //     0,
      //     addr1.address,
      //     0,
      //     ethers.parseEther("1000")
      //   )
      // );
    });
  });
});
