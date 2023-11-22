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
export const GET_DONATION_BY_ARTICLE = gql`
  query GetDonationById($donorId: ID!, $articleId: BigInt!) {
    donations(where: { donor: { id: $donorId }, article: { id: $articleId } }) {
      id
      amount
      donor {
        id
      }
      article {
        articleId
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
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

export const GET_ARTICLES_BY_ID_AND_ADDRESS = gql`
  query GetArticlesByAuthorAddress(
    $authorAddress: Bytes!
    $articleId: BigInt!
  ) {
    articles(
      where: {
        AND: [
          { authorAddress: { equals: $authorAddress } }
          { articleId: { equals: $articleId } }
        ]
      }
    ) {
      id
      content
      articleId
      authorAddress
      donations {
        id
        donor {
          id
        }
        amount
      }
      allocation {
        id
        amount
      }
      associatedRound {
        id
        owner
        roundId
      }
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
