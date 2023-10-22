import { gql } from "@apollo/client";
export const GET_ARTICLE_POSTED = gql`
  query GetArticlePosted {
    articlePosteds {
      id
      author
      content
      articleId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle {
    articles {
      id
      articleId
      author {
        id
      }
      authorAddress
      content
      donations {
        id
        amount
      }
      associatedRound {
        id
        name
      }
    }
  }
`;
export const GET_ARTICLE_BY_ID = gql`
  query GetArticleByAuthor($authorAddress: Bytes!) {
    articles(where: { authorAddress: $authorAddress }) {
      id
      articleId
      author {
        id
      }
      authorAddress
      content
      donations {
        id
        amount
      }
      allocation {
        id
        amount
        articleId
      }
      associatedRound {
        id
        name
      }
    }
  }
`;
// 0x3a28d5a8614a278a2df4117f1857e204cf884d63
export const GET_DONATIONS_BY_USER = gql`
  query GetDonationsByUser($id: ID!) {
    users(where: { id: $id }) {
      id
      donations {
        id
        amount
      }
      recievedDonations {
        id
        amount
      }
      allocation {
        id
        roundId
        amount
      }
      articles {
        id
      }
    }
  }
`;

export const GET_ARTICLES_BY_AUTHOR_ADDRESS = gql`
  query GetArticlesByAuthorAddress($authorAddress: Bytes!) {
    articlePosteds(where: { author: $authorAddress }) {
      id
      content
      articleId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
export const GET_ARTICLES_BY_ID_AND_ADDRESS = gql`
  query GetArticlesByAuthorAddress(
    $authorAddress: Bytes!
    $articleId: BigInt!
  ) {
    articlePosteds(where: { author: $authorAddress, articleId: $articleId }) {
      id
      content
      articleId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
export const GET_ALL_ROUNDS = gql`
  query GetAllRounds {
    rounds {
      id
      owner
      ipoolAddress
      name
      startDate
      endDate
      articles {
        id
        content
      }
    }
  }
`;
