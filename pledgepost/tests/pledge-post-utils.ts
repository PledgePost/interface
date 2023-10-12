import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Allocated,
  ArticleDonated,
  ArticlePosted,
  RoundCreated
} from "../generated/PledgePost/PledgePost"

export function createAllocatedEvent(
  roundId: BigInt,
  recipient: Address,
  amount: BigInt
): Allocated {
  let allocatedEvent = changetype<Allocated>(newMockEvent())

  allocatedEvent.parameters = new Array()

  allocatedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  allocatedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  allocatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return allocatedEvent
}

export function createArticleDonatedEvent(
  author: Address,
  from: Address,
  articleId: BigInt,
  amount: BigInt
): ArticleDonated {
  let articleDonatedEvent = changetype<ArticleDonated>(newMockEvent())

  articleDonatedEvent.parameters = new Array()

  articleDonatedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  articleDonatedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  articleDonatedEvent.parameters.push(
    new ethereum.EventParam(
      "articleId",
      ethereum.Value.fromUnsignedBigInt(articleId)
    )
  )
  articleDonatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return articleDonatedEvent
}

export function createArticlePostedEvent(
  author: Address,
  content: string,
  articleId: BigInt
): ArticlePosted {
  let articlePostedEvent = changetype<ArticlePosted>(newMockEvent())

  articlePostedEvent.parameters = new Array()

  articlePostedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  articlePostedEvent.parameters.push(
    new ethereum.EventParam("content", ethereum.Value.fromString(content))
  )
  articlePostedEvent.parameters.push(
    new ethereum.EventParam(
      "articleId",
      ethereum.Value.fromUnsignedBigInt(articleId)
    )
  )

  return articlePostedEvent
}

export function createRoundCreatedEvent(
  owner: Address,
  poolAddress: Address,
  startDate: BigInt,
  endDate: BigInt
): RoundCreated {
  let roundCreatedEvent = changetype<RoundCreated>(newMockEvent())

  roundCreatedEvent.parameters = new Array()

  roundCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolAddress",
      ethereum.Value.fromAddress(poolAddress)
    )
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startDate",
      ethereum.Value.fromUnsignedBigInt(startDate)
    )
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )

  return roundCreatedEvent
}
