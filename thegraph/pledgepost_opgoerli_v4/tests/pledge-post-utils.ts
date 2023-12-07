import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Allocated,
  ArticleDonated,
  ArticlePosted,
  Initialized,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RoundApplied,
  RoundCreated
} from "../generated/PledgePost/PledgePost"

export function createAllocatedEvent(
  roundId: BigInt,
  recipient: Address,
  articleId: BigInt,
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
    new ethereum.EventParam(
      "articleId",
      ethereum.Value.fromUnsignedBigInt(articleId)
    )
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

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createRoundAppliedEvent(
  author: Address,
  articleId: BigInt,
  roundId: BigInt
): RoundApplied {
  let roundAppliedEvent = changetype<RoundApplied>(newMockEvent())

  roundAppliedEvent.parameters = new Array()

  roundAppliedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  roundAppliedEvent.parameters.push(
    new ethereum.EventParam(
      "articleId",
      ethereum.Value.fromUnsignedBigInt(articleId)
    )
  )
  roundAppliedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )

  return roundAppliedEvent
}

export function createRoundCreatedEvent(
  owner: Address,
  ipoolAddress: Address,
  roundId: BigInt,
  name: Bytes,
  description: Bytes,
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
      "ipoolAddress",
      ethereum.Value.fromAddress(ipoolAddress)
    )
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromBytes(name))
  )
  roundCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromBytes(description)
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
