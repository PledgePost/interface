"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col justify-center lg:p-12 p-4">
      <Image
        className="mx-auto w-1/2 flex justify-center items-center"
        src={
          "https://github.com/PledgePost/interface/assets/67859510/4623c0ae-540e-4a9d-ba95-365e4bad5bc1"
        }
        alt="PledgePost Diagram"
        width={800}
        height={800}
      />
      <div className="md:w-1/2 p-4 mx-auto flex flex-col justify-center gap-4">
        <>
          <h1 className=" font-extrabold">WTF is PledgePost?</h1>
          <p className="text-gray-500">
            PledgePost is a platform where writers can publish articles, collect
            donations, and receive additional funding for their contributions
            through Quadratic Funding. We envision a world where contributions
            to collective knowledge, an important public good, are fairly
            rewarded, and the main goal of PledgePost is not only to promote
            open knowledge sharing, but also to ensure that it is incentivized
            and respected. Our platform will ensure that writers are fairly
            rewarded for their invaluable role in enriching our collective
            knowledge.
          </p>
        </>
        <>
          <h1 className=" font-extrabold">How PledgePost works?</h1>
          <p className="text-gray-500">
            PledgePost is built on top of Allo Protocol by Gitcoin, which is a
            set of smart contracts that collectively offer an advanced framework
            for fund management, fee handling, and governance.
          </p>
          <p className="text-gray-500">
            PledgePost is using
            DonationVotingMerkleDistributionDirectTransferStrategy to distribute
            funds to writers. This strategy is based on the idea of Quadratic
            Funding, which is a mechanism for funding public goods like Gitcoin
            does. It is a matching fund that matches the square of the sum of
            the square roots of the contributions, in our case it is donations
            for the articles posted through PledgePost.
          </p>
        </>
      </div>
    </div>
  );
}
