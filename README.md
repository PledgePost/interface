# PledgePost

**PledgePost: A Quadratic Funding Media Platform**

To test PledgePost, go to `/dashboard` and get test USDC to donate! you can also post article without paying any gas!

Happy to hear your feedback! feel free to say hi:)
## Description

**Introduction**:
PledgePost is a platform where writers can publish their articles, collect donations, and receive extra funds based on those donations through [Quadratic Funding (QF)](https://www.wtfisqf.com/).
QF is a unique model designed to allocate funds based on both the number of contributors and the amounts they contribute. Unlike traditional funding models where every contribution is valued equally, QF amplifies the influence of each individual donation, fostering broader participation.

**Objective**:
We envision a world where contributions to collective intelligence, a vital public good, are duly rewarded. PledgePost's primary objective is not only to promote open knowledge-sharing but also to ensure it's incentivized and esteemed. Our platform ensures writers are fairly compensated for their pivotal role in enriching our collective intelligence.

**Core Features**:

1. **Content Creation and Management**:
   - Writers can effortlessly draft and publish their articles on the platform.
   - Flexibility is offered to apply for grant rounds at any time.
2. **Grant Rounds**:
   - Grant rounds take place quarterly.
   - Diverse grant rounds are available each quarter, allowing writers to match their articles with the most fitting rounds.
   - At each quarter's end, funds from a matching pool are allocated according to QF principles, prioritizing both donation sizes and the number of donors.
3. **Community Engagement**:
   - Users can financially back articles that resonate with them or that they believe hold value.
   - Only donors have the privilege to comment on an article. This system not only uplifts the quality of discourse by ensuring engaged and invested participants but also reduces the likelihood of spam or derogatory comments. Moreover, the opportunity to engage in discussions can act as an added incentive for donations, possibly encouraging more robust participation and higher contributions.
4. **Dashboard Features**:
   - A detailed dashboard enables writers to draft, edit, and publish their articles.
   - It also provides insights into contribution amounts, donor counts, and comment statistics.

## How we have made

### Core Components of PledgePost

PledgePost consists of a core contract (PledgePost.sol) and a peripheral PoolContract.sol that is generated for each grant and a contract that mints ERC721NFT for each donation.
For QuadraticFunding, MatchingFunds calculation and Distribution are calculated automatically
There is a Pool that is the source for distributing funds for each Round, and the allocation is automatically calculated based on the amount of donations to each article. This allows for a more equitable distribution of funds and returns value to creators.

### Future Work

Here is a list of what we didn't make in the past two weeks for the future. We will keep building something cool OSS, so PR and discussion are gladly welcome :)

- Anti Sybil attacks: Implementation of on-chain verification Gitcoin Passort, Ethereum Attestation Service, or using human verification such as WorldID etc.
- Specific frontend for grant manager: Specific frontend for grant manager, distribution, etc.
- Search/ Share features: Custom queries for article search and share features on Socialmedia such as Lens and Farcaster
- Notification: Notification of comments and new articles from content creators you follow

## Deployed contracts and links

### PledgePost.sol

CntractAddress: 0x7c1a2f6bb2E01fc051298bCB279008ffC256d35f

[Polygon Mumbai](https://mumbai.polygonscan.com/address/0x7c1a2f6bb2E01fc051298bCB279008ffC256d35f)

[PolygonZkevm Testnet](https://testnet-zkevm.polygonscan.com/address/0x7c1a2f6bb2E01fc051298bCB279008ffC256d35f)

[Scroll Sepolia testnet](https://sepolia.scrollscan.com/address/0x7c1a2f6bb2E01fc051298bCB279008ffC256d35f)

[Op-goerli](https://goerli-optimistic.etherscan.io/address/0x7c1a2f6bb2E01fc051298bCB279008ffC256d35f)


## Tech stack & Tools

- Next.js13, Typescript, React, TailwindCSS, solidity
- Ethers.js
- Hardhat
- TheGraph
- Safe AA SDK
- Biconomy SDK
- Tableland
- Filecoin


## Getting Started

setup frontend

```bash
npm install
# or
yarn install
# or
pnpm install
```

run frontend server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
