import {
  Allocated as AllocatedEvent,
  ArticleDonated as ArticleDonatedEvent,
  ArticlePosted as ArticlePostedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  RoundApplied as RoundAppliedEvent,
  RoundCreated as RoundCreatedEvent,
} from "../generated/PledgePost/PledgePost";
import {
  Article,
  User,
  Donation,
  Round,
  Allocated,
  ArticleDonated,
  ArticlePosted,
  Initialized,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RoundApplied,
  RoundCreated,
} from "../generated/schema";

export function handleAllocated(event: AllocatedEvent): void {
  let entity = new Allocated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.roundId = event.params.roundId;
  entity.recipient = event.params.recipient;
  entity.articleId =
    event.params.articleId.toString() +
    "-" +
    event.params.recipient.toHexString();
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
  let donation = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  donation.amount = event.params.amount;
  donation.article =
    event.params.articleId.toString() + "-" + event.params.author.toHexString();
  donation.donor = event.params.from;
  donation.author = event.params.author;
  donation.save();

  let user = User.load(event.params.from);
  if (!user) {
    user = new User(event.params.from);
    user.save();
  }
  user.save();
}

export function handleArticlePosted(event: ArticlePostedEvent): void {
  let entity = new ArticlePosted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.author = event.params.author;
  entity.content = event.params.content;
  entity.articleId = event.params.articleId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  let article = Article.load(
    event.params.articleId.toString() + "-" + event.params.author.toHexString()
  );
  if (!article) {
    article = new Article(
      event.params.articleId.toString() +
        "-" +
        event.params.author.toHexString()
    );
    article.articleId = event.params.articleId;
    article.author = event.params.author;
    article.authorAddress = event.params.author;
    article.content = event.params.content;
    article.save();
  }
  article.content = event.params.content;
  article.save();

  let user = User.load(event.params.author);
  if (!user) {
    user = new User(event.params.author);
    user.save();
  }
  user.save();
}

export function handleRoundApplied(event: RoundAppliedEvent): void {
  let entity = new RoundApplied(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.author = event.params.author;
  entity.articleId = event.params.articleId;
  entity.roundId = event.params.roundId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let article = Article.load(
    event.params.articleId.toString() + "-" + event.params.author.toHexString()
  );
  if (!article) {
    article = new Article(
      event.params.articleId.toString() +
        "-" +
        event.params.author.toHexString()
    );
    article.articleId = event.params.articleId;
    article.author = event.params.author;
    article.authorAddress = event.params.author;
    article.associatedRound = event.params.roundId.toString();
    article.save();
  }
  article.associatedRound = event.params.roundId.toString();
  article.save();

  let user = User.load(event.params.author);
  if (!user) {
    user = new User(event.params.author);
    user.save();
  }
  user.save();
}

export function handleRoundCreated(event: RoundCreatedEvent): void {
  let entity = new RoundCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.ipoolAddress = event.params.ipoolAddress;
  entity.roundId = event.params.roundId;
  entity.name = event.params.name;
  entity.startDate = event.params.startDate;
  entity.endDate = event.params.endDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  entity.save();

  let round = Round.load(event.params.roundId.toString());
  if (!round) {
    round = new Round(event.params.roundId.toString());
    round.roundId = event.params.roundId;
    round.owner = event.params.owner;
    round.ipoolAddress = event.params.ipoolAddress;
    round.name = event.params.name;
    round.startDate = event.params.startDate;
    round.endDate = event.params.endDate;
    round.save();
  }
  round.owner = event.params.owner;
  round.roundId = event.params.roundId;
  round.ipoolAddress = event.params.ipoolAddress;
  round.name = event.params.name;
  round.startDate = event.params.startDate;
  round.endDate = event.params.endDate;
  round.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.version = event.params.version;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
