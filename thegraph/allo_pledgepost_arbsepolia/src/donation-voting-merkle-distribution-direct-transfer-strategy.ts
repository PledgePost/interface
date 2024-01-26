import {
  Allocated as AllocatedEvent,
  BatchPayoutSuccessful as BatchPayoutSuccessfulEvent,
  Distributed as DistributedEvent,
  DistributionUpdated as DistributionUpdatedEvent,
  FundsDistributed as FundsDistributedEvent,
  Initialized as InitializedEvent,
  PoolActive as PoolActiveEvent,
  RecipientStatusUpdated as RecipientStatusUpdatedEvent,
  Registered as RegisteredEvent,
  TimestampsUpdated as TimestampsUpdatedEvent,
  UpdatedRegistration as UpdatedRegistrationEvent,
} from "../generated/DonationVotingMerkleDistributionDirectTransferStrategy/DonationVotingMerkleDistributionDirectTransferStrategy";
import {
  User,
  Article,
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
  UpdatedRegistration,
} from "../generated/schema";

export function handleAllocated(event: AllocatedEvent): void {
  let entity = new Allocated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipientId = event.params.recipientId;
  entity.amount = event.params.amount;
  entity.token = event.params.token;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchPayoutSuccessful(
  event: BatchPayoutSuccessfulEvent
): void {
  let entity = new BatchPayoutSuccessful(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDistributed(event: DistributedEvent): void {
  let entity = new Distributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipientId = event.params.recipientId;
  entity.recipientAddress = event.params.recipientAddress;
  entity.amount = event.params.amount;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDistributionUpdated(
  event: DistributionUpdatedEvent
): void {
  let entity = new DistributionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.merkleRoot = event.params.merkleRoot;
  entity.metadata_protocol = event.params.metadata.protocol;
  entity.metadata_pointer = event.params.metadata.pointer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFundsDistributed(event: FundsDistributedEvent): void {
  let entity = new FundsDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.amount = event.params.amount;
  entity.grantee = event.params.grantee;
  entity.token = event.params.token;
  entity.recipientId = event.params.recipientId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.poolId = event.params.poolId;
  entity.data = event.params.data;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePoolActive(event: PoolActiveEvent): void {
  let entity = new PoolActive(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.active = event.params.active;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRecipientStatusUpdated(
  event: RecipientStatusUpdatedEvent
): void {
  let entity = new RecipientStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.rowIndex = event.params.rowIndex;
  entity.fullRow = event.params.fullRow;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRegistered(event: RegisteredEvent): void {
  let entity = new Registered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.recipientId = event.params.recipientId;
  entity.data = event.params.data;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let user = new User(event.params.sender);
  user.save();

  let article = new Article(event.params.recipientId);
  article.address = event.params.sender;
  article.save();
}

export function handleTimestampsUpdated(event: TimestampsUpdatedEvent): void {
  let entity = new TimestampsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.registrationStartTime = event.params.registrationStartTime;
  entity.registrationEndTime = event.params.registrationEndTime;
  entity.allocationStartTime = event.params.allocationStartTime;
  entity.allocationEndTime = event.params.allocationEndTime;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdatedRegistration(
  event: UpdatedRegistrationEvent
): void {
  let entity = new UpdatedRegistration(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipientId = event.params.recipientId;
  entity.data = event.params.data;
  entity.sender = event.params.sender;
  entity.status = event.params.status;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
