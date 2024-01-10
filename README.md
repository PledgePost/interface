## PledgePost: Quadratic Funding Media Platform

deployed strategy(Arb-Sepolia): [0x491D557fb2888403365CA68e354cF8DD35FCf907](https://sepolia.arbiscan.io/address/0x491d557fb2888403365ca68e354cf8dd35fcf907)

<img width="1104" alt="Screenshot 2023-11-25 at 20 30 26" src="https://github.com/PledgePost/interface/assets/67859510/4623c0ae-540e-4a9d-ba95-365e4bad5bc1">

## WTF is PledgePost?

PledgePost is a platform where writers can publish articles, collect donations, and receive additional funding for their contributions through Quadratic Funding. We envision a world where contributions to collective knowledge, an important public good, are fairly rewarded, and the main goal of PledgePost is not only to promote open knowledge sharing, but also to ensure that it is incentivized and respected. Our platform will ensure that writers are fairly rewarded for their invaluable role in enriching our collective knowledge.

## Why PledgePost is needed?

We now have great funding mechanisms for public goods, including Quadratic Funding from Gitcoin and Giveth, and Retroactive Public Goods Funding from Optimism.

PledgePost will explore new use cases for these mechanisms and create opportunities to fund writers and researchers who are not being funded fairly.

Articles by individual writers and researchers are very important in the Blockchain ecosystem, including Ethereum. These articles are extremely useful for developers and serve as useful educational material for beginners. They must rely on subscriptions from readers, even if the result is a reflection of the Blockchain ecosystem. This is precisely the challenge that the OSS has had, since articles are essentially a public good that can be read for free, non-competitive and non-exclusive.
PledgePost has the potential to be applied in the future not only to the blockchain ecosystem, but also to fields such as academic writing and all media.

## How PledgePost works?

PledgePost is built on top of Allo Protocol by Gitcoin, which is a set of smart contracts that collectively offer an advanced framework for fund management, fee handling, and governance.

PledgePost is using DonationVoting strategy to distribute funds to writers. This strategy is based on the idea of Quadratic Funding, which is a mechanism for funding public goods like Gitcoin does. It is a matching fund that matches the square of the sum of the square roots of the contributions, in our case it is donations for the articles posted through PledgePost.
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
