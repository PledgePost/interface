import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Allocated,
  BatchPayoutSuccessful,
  Distributed,
  DistributionUpdated,
  FundsDistributed,
  Initialized,
  PoolActive,
  RecipientStatusUpdated,
  Registered,
  TimestampsUpdated,
  UpdatedRegistration
} from "../generated/DonationVotingMerkleDistributionDirectTransferStrategy/DonationVotingMerkleDistributionDirectTransferStrategy"

export function createAllocatedEvent(
  recipientId: Address,
  amount: BigInt,
  token: Address,
  sender: Address
): Allocated {
  let allocatedEvent = changetype<Allocated>(newMockEvent())

  allocatedEvent.parameters = new Array()

  allocatedEvent.parameters.push(
    new ethereum.EventParam(
      "recipientId",
      ethereum.Value.fromAddress(recipientId)
    )
  )
  allocatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  allocatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  allocatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return allocatedEvent
}

export function createBatchPayoutSuccessfulEvent(
  sender: Address
): BatchPayoutSuccessful {
  let batchPayoutSuccessfulEvent = changetype<BatchPayoutSuccessful>(
    newMockEvent()
  )

  batchPayoutSuccessfulEvent.parameters = new Array()

  batchPayoutSuccessfulEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return batchPayoutSuccessfulEvent
}

export function createDistributedEvent(
  recipientId: Address,
  recipientAddress: Address,
  amount: BigInt,
  sender: Address
): Distributed {
  let distributedEvent = changetype<Distributed>(newMockEvent())

  distributedEvent.parameters = new Array()

  distributedEvent.parameters.push(
    new ethereum.EventParam(
      "recipientId",
      ethereum.Value.fromAddress(recipientId)
    )
  )
  distributedEvent.parameters.push(
    new ethereum.EventParam(
      "recipientAddress",
      ethereum.Value.fromAddress(recipientAddress)
    )
  )
  distributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  distributedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return distributedEvent
}

export function createDistributionUpdatedEvent(
  merkleRoot: Bytes,
  metadata: ethereum.Tuple
): DistributionUpdated {
  let distributionUpdatedEvent = changetype<DistributionUpdated>(newMockEvent())

  distributionUpdatedEvent.parameters = new Array()

  distributionUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )
  distributionUpdatedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromTuple(metadata))
  )

  return distributionUpdatedEvent
}

export function createFundsDistributedEvent(
  amount: BigInt,
  grantee: Address,
  token: Address,
  recipientId: Address
): FundsDistributed {
  let fundsDistributedEvent = changetype<FundsDistributed>(newMockEvent())

  fundsDistributedEvent.parameters = new Array()

  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam("grantee", ethereum.Value.fromAddress(grantee))
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "recipientId",
      ethereum.Value.fromAddress(recipientId)
    )
  )

  return fundsDistributedEvent
}

export function createInitializedEvent(
  poolId: BigInt,
  data: Bytes
): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  initializedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return initializedEvent
}

export function createPoolActiveEvent(active: boolean): PoolActive {
  let poolActiveEvent = changetype<PoolActive>(newMockEvent())

  poolActiveEvent.parameters = new Array()

  poolActiveEvent.parameters.push(
    new ethereum.EventParam("active", ethereum.Value.fromBoolean(active))
  )

  return poolActiveEvent
}

export function createRecipientStatusUpdatedEvent(
  rowIndex: BigInt,
  fullRow: BigInt,
  sender: Address
): RecipientStatusUpdated {
  let recipientStatusUpdatedEvent = changetype<RecipientStatusUpdated>(
    newMockEvent()
  )

  recipientStatusUpdatedEvent.parameters = new Array()

  recipientStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "rowIndex",
      ethereum.Value.fromUnsignedBigInt(rowIndex)
    )
  )
  recipientStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "fullRow",
      ethereum.Value.fromUnsignedBigInt(fullRow)
    )
  )
  recipientStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return recipientStatusUpdatedEvent
}

export function createRegisteredEvent(
  recipientId: Address,
  data: Bytes,
  sender: Address
): Registered {
  let registeredEvent = changetype<Registered>(newMockEvent())

  registeredEvent.parameters = new Array()

  registeredEvent.parameters.push(
    new ethereum.EventParam(
      "recipientId",
      ethereum.Value.fromAddress(recipientId)
    )
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return registeredEvent
}

export function createTimestampsUpdatedEvent(
  registrationStartTime: BigInt,
  registrationEndTime: BigInt,
  allocationStartTime: BigInt,
  allocationEndTime: BigInt,
  sender: Address
): TimestampsUpdated {
  let timestampsUpdatedEvent = changetype<TimestampsUpdated>(newMockEvent())

  timestampsUpdatedEvent.parameters = new Array()

  timestampsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "registrationStartTime",
      ethereum.Value.fromUnsignedBigInt(registrationStartTime)
    )
  )
  timestampsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "registrationEndTime",
      ethereum.Value.fromUnsignedBigInt(registrationEndTime)
    )
  )
  timestampsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "allocationStartTime",
      ethereum.Value.fromUnsignedBigInt(allocationStartTime)
    )
  )
  timestampsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "allocationEndTime",
      ethereum.Value.fromUnsignedBigInt(allocationEndTime)
    )
  )
  timestampsUpdatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return timestampsUpdatedEvent
}

export function createUpdatedRegistrationEvent(
  recipientId: Address,
  data: Bytes,
  sender: Address,
  status: i32
): UpdatedRegistration {
  let updatedRegistrationEvent = changetype<UpdatedRegistration>(newMockEvent())

  updatedRegistrationEvent.parameters = new Array()

  updatedRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "recipientId",
      ethereum.Value.fromAddress(recipientId)
    )
  )
  updatedRegistrationEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  updatedRegistrationEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  updatedRegistrationEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return updatedRegistrationEvent
}
