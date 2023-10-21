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
      associatedRound {
        id
        name
      }
    }
  }
`;
export const GET_DONATIONS_BY_USER = gql`
  query GetDonationsByUser($userId: ID!) {
    user(id: $userId) {
      id
      donations {
        id
        amount
        article {
          id
          content
        }
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
