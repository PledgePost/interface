import {
  Allocated as AllocatedEvent,
  ArticleDonated as ArticleDonatedEvent,
  ArticlePosted as ArticlePostedEvent,
  RoundCreated as RoundCreatedEvent,
} from "../generated/PledgePost/PledgePost";
import {
  Allocated,
  ArticleDonated,
  ArticlePosted,
  RoundCreated,
} from "../generated/schema";

export function handleAllocated(event: AllocatedEvent): void {
  let entity = new Allocated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleArticleDonated(event: ArticleDonatedEvent): void {
  let entity = new ArticleDonated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.author = event.params.author;
  entity.from = event.params.from;
  entity.articleId = event.params.articleId;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleArticlePosted(event: ArticlePostedEvent): void {
  let entity = new ArticlePosted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.author = event.params.author;
  entity.content = event.params.content.toString(); //MEMO: Type 'Bytes' is not assignable to type 'string'. I added toString()
  entity.articleId = event.params.articleId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoundCreated(event: RoundCreatedEvent): void {
  let entity = new RoundCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.ipoolAddress = event.params.ipoolAddress;
  entity.startDate = event.params.startDate;
  entity.endDate = event.params.endDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
