import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { Allocated } from "../generated/schema"
import { Allocated as AllocatedEvent } from "../generated/PledgePost/PledgePost"
import { handleAllocated } from "../src/pledge-post"
import { createAllocatedEvent } from "./pledge-post-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let roundId = BigInt.fromI32(234)
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let articleId = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let newAllocatedEvent = createAllocatedEvent(
      roundId,
      recipient,
      articleId,
      amount
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
      "roundId",
      "234"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "articleId",
      "234"
    )
    assert.fieldEquals(
      "Allocated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
