import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Allocated } from "../generated/schema"
import { Allocated as AllocatedEvent } from "../generated/DonationVotingMerkleDistributionDirectTransferStrategy/DonationVotingMerkleDistributionDirectTransferStrategy"
import { handleAllocated } from "../src/donation-voting-merkle-distribution-direct-transfer-strategy"
import { createAllocatedEvent } from "./donation-voting-merkle-distribution-direct-transfer-strategy-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let recipientId = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAllocatedEvent = createAllocatedEvent(
      recipientId,
      amount,
      token,
      sender
    )
    handleAllocated(newAllocatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Allocated created and stored", () => {
    assert.entityCount("Allocated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipientId",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
