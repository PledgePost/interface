export const ABIs = {
  _format: "hh-sol-artifact-1",
  contractName: "PledgePost",
  sourceName: "contracts/PledgePost.sol",
  contractAddress: "0xdDA61E11e796543dA1498F17257Ff4C94E80bcC0",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "articleId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Allocated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "author",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "articleId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ArticleDonated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "author",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "articleId",
          type: "uint256",
        },
      ],
      name: "ArticlePosted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "author",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "articleId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "RoundApplied",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "ipoolAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
      ],
      name: "RoundCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "Allocate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "acceptApplication",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "activateRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
      ],
      name: "addAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "applicationStatusForRound",
      outputs: [
        {
          internalType: "enum PledgePost.ApplicationStatus",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "applyForRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "articleDonators",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "authorArticles",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "author",
          type: "address",
        },
        {
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "donationsReceived",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "authorToArticleIdToRound",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "description",
          type: "bytes",
        },
        {
          internalType: "address payable",
          name: "poolAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "poolAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "createdTimestamp",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "authorTotalDonations",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
      ],
      name: "checkAdminRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "checkOwner",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_endDate",
          type: "uint256",
        },
      ],
      name: "createRound",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "description",
              type: "bytes",
            },
            {
              internalType: "address payable",
              name: "poolAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          internalType: "struct PledgePost.Round",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "deactivateRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "denyApplication",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "deposit",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "donateToArticle",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
      ],
      name: "getAllAuthorArticle",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "author",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "donationsReceived",
              type: "uint256",
            },
          ],
          internalType: "struct PledgePost.Article[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllRound",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "description",
              type: "bytes",
            },
            {
              internalType: "address payable",
              name: "poolAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          internalType: "struct PledgePost.Round[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getAllocation",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getApplicationStatus",
      outputs: [
        {
          internalType: "enum PledgePost.ApplicationStatus",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "getAppliedArticle",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "author",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "donationsReceived",
              type: "uint256",
            },
          ],
          internalType: "struct PledgePost.Article",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getAppliedRound",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "description",
              type: "bytes",
            },
            {
              internalType: "address payable",
              name: "poolAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          internalType: "struct PledgePost.Round",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getAuthorArticle",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "author",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "donationsReceived",
              type: "uint256",
            },
          ],
          internalType: "struct PledgePost.Article",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getDonatedAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "getEstimatedAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
      ],
      name: "getMatchingAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "getRecievedDonationsWithinRound",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "getRound",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "description",
              type: "bytes",
            },
            {
              internalType: "address payable",
              name: "poolAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "poolAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "startDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          internalType: "struct PledgePost.Round",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRoundLength",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
      ],
      name: "getSquareRoot",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_roundId",
          type: "uint256",
        },
      ],
      name: "getTotalSquareSqrtSum",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "matchingAmounts",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nft",
      outputs: [
        {
          internalType: "contract IPledgePostERC721",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_content",
          type: "string",
        },
      ],
      name: "postArticle",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "recievedDonationsWithinRound",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_admin",
          type: "address",
        },
      ],
      name: "removeAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "roundArticles",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "author",
          type: "address",
        },
        {
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "donationsReceived",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "rounds",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "description",
          type: "bytes",
        },
        {
          internalType: "address payable",
          name: "poolAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "poolAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "startDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "createdTimestamp",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_articleId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_content",
          type: "string",
        },
      ],
      name: "updateArticle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  bytecode:
    "0x60806040526000600a553480156200001657600080fd5b50600b80546001600160a01b0319163390811790915562000059907fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217759062000132565b306040516200006890620001e2565b6001600160a01b0390911681526040602082018190526052908201527f68747470733a2f2f6261667962656965763474676b747674676f35686a6d667560608201527f6b6a3570373669773575796833626973753769766b3673346e376d667972716d6080820152717666342e697066732e647765622e6c696e6b60701b60a082015260c001604051809103906000f0801580156200010b573d6000803e3d6000fd5b50600c80546001600160a01b0319166001600160a01b0392909216919091179055620001f0565b6200013e828262000142565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200013e576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200019e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61312c8062004c1783390190565b614a1780620002006000396000f3fe6080604052600436106102ae5760003560e01c80638f1327c011610175578063c727ed66116100dc578063e386be2e11610095578063f16255341161006f578063f16255341461091a578063f1f666751461093a578063f94726891461095a578063fe81a1f71461099857600080fd5b8063e386be2e146108ba578063e48262f2146108da578063e5df05cf146108fa57600080fd5b8063c727ed66146107e4578063ce45ce0f14610825578063ce6236ca14610838578063cecb2b041461084d578063d547741f1461087a578063db76c7101461089a57600080fd5b8063abb74ba51161012e578063abb74ba514610713578063afba9ada14610733578063b283607b14610771578063b6b55f2514610791578063c0b50cb8146107a4578063c6fd06c7146107c457600080fd5b80638f1327c0146106515780638ff4dd941461067e57806391cb292e1461069e57806391d14854146106be578063a217fddf146106de578063a4e60c0f146106f357600080fd5b80632da32fca1161021957806370480275116101d2578063704802751461058f57806375b238fc146105af57806376c83753146105d15780638120abed146105f15780638c65c81f146106115780638da5cb5b1461063157600080fd5b80632da32fca146104b75780632f2ff15d146104d757806336568abe146104f757806337cae80a1461051757806347ccca021461054f57806358440d7f1461056f57600080fd5b80631785f53c1161026b5780631785f53c146103b65780631bfddd35146103d65780631c9bb65d146103f657806320fb90dd14610424578063248a9ca31461045157806327a1de951461048157600080fd5b806301ffc9a7146102b357806302ed0865146102e857806305499b7a14610315578063101a3cc414610337578063104dbc111461036757806314743e7e14610394575b600080fd5b3480156102bf57600080fd5b506102d36102ce36600461387d565b6109b8565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b506103086103033660046138bc565b6109ef565b6040516102df919061390a565b34801561032157600080fd5b5061032a610aec565b6040516102df9190613a3d565b34801561034357600080fd5b50610357610352366004613a9f565b610ce0565b6040516102df9493929190613acb565b34801561037357600080fd5b50610387610382366004613b06565b610dbc565b6040516102df9190613b68565b3480156103a057600080fd5b506103b46103af366004613bbd565b610eed565b005b3480156103c257600080fd5b506103b46103d1366004613b06565b611054565b3480156103e257600080fd5b506103b46103f1366004613bd6565b611099565b34801561040257600080fd5b50610416610411366004613bf8565b6113d2565b6040519081526020016102df565b34801561043057600080fd5b5061044461043f366004613a9f565b6114a4565b6040516102df9190613c35565b34801561045d57600080fd5b5061041661046c366004613bbd565b60009081526020819052604090206001015490565b34801561048d57600080fd5b506104a161049c366004613a9f565b6115f8565b6040516102df9a99989796959493929190613c48565b3480156104c357600080fd5b506104166104d23660046138bc565b61177a565b3480156104e357600080fd5b506103b46104f2366004613cc0565b6118d8565b34801561050357600080fd5b506103b4610512366004613cc0565b611902565b34801561052357600080fd5b50610537610532366004613cf0565b611980565b6040516001600160a01b0390911681526020016102df565b34801561055b57600080fd5b50600c54610537906001600160a01b031681565b34801561057b57600080fd5b506103b461058a3660046138bc565b6119c5565b34801561059b57600080fd5b506103b46105aa366004613b06565b611aad565b3480156105bb57600080fd5b506104166000805160206149c283398151915281565b3480156105dd57600080fd5b506104446105ec366004613bd6565b611aef565b3480156105fd57600080fd5b506103b461060c366004613dc8565b611b6e565b34801561061d57600080fd5b506104a161062c366004613bbd565b611cbb565b34801561063d57600080fd5b50600b54610537906001600160a01b031681565b34801561065d57600080fd5b5061067161066c366004613bbd565b611d01565b6040516102df9190613e0f565b34801561068a57600080fd5b50610357610699366004613bd6565b611f30565b3480156106aa57600080fd5b506102d36106b9366004613e22565b611f4c565b3480156106ca57600080fd5b506102d36106d9366004613cc0565b612008565b3480156106ea57600080fd5b50610416600081565b3480156106ff57600080fd5b5061067161070e366004613a9f565b612031565b34801561071f57600080fd5b5061041661072e366004613cf0565b61222b565b34801561073f57600080fd5b5061041661074e366004613cf0565b600760209081526000938452604080852082529284528284209052825290205481565b34801561077d57600080fd5b5061041661078c3660046138bc565b61231c565b6102d361079f366004613bbd565b612409565b3480156107b057600080fd5b506104166107bf366004613a9f565b612597565b3480156107d057600080fd5b506103b46107df366004613bbd565b612612565b3480156107f057600080fd5b506103086107ff366004613cf0565b600660209081526000938452604080852082529284528284209052825290205460ff1681565b6103b4610833366004613a9f565b61291f565b34801561084457600080fd5b50600a54610416565b34801561085957600080fd5b50610416610868366004613b06565b60026020526000908152604090205481565b34801561088657600080fd5b506103b4610895366004613cc0565b612cb8565b3480156108a657600080fd5b506104166108b5366004613bbd565b612cdd565b3480156108c657600080fd5b506102d36108d5366004613b06565b612ce8565b3480156108e657600080fd5b506106716108f5366004613e52565b612d02565b34801561090657600080fd5b50610416610915366004613bbd565b613040565b34801561092657600080fd5b506103b4610935366004613bbd565b613119565b34801561094657600080fd5b506103b46109553660046138bc565b61322d565b34801561096657600080fd5b506104166109753660046138bc565b600860209081526000938452604080852082529284528284209052825290205481565b3480156109a457600080fd5b506104166109b3366004613ec6565b61330e565b60006001600160e01b03198216637965db0b60e01b14806109e957506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000600a54841115610a1c5760405162461bcd60e51b8152600401610a1390613efb565b60405180910390fd5b60008411610a3c5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b0383166000908152600160205260409020548210610a735760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b03831660009081526005602090815260408083208584529091529020548414610ab55760405162461bcd60e51b8152600401610a1390613f90565b506001600160a01b0382166000908152600660209081526040808320848452825280832086845290915290205460ff169392505050565b60606009805480602002602001604051908101604052809291908181526020016000905b82821015610cd75760008481526020908190206040805161014081018252600a86029092018054835260018101546001600160a01b03169383019390935260028301805492939291840191610b6490613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610b9090613fd5565b8015610bdd5780601f10610bb257610100808354040283529160200191610bdd565b820191906000526020600020905b815481529060010190602001808311610bc057829003601f168201915b50505050508152602001600382018054610bf690613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2290613fd5565b8015610c6f5780601f10610c4457610100808354040283529160200191610c6f565b820191906000526020600020905b815481529060010190602001808311610c5257829003601f168201915b505050918352505060048201546001600160a01b0316602080830191909152600583015460408301526006830154606083015260078301546080830152600883015460a083015260099092015460ff16151560c0909101529082526001929092019101610b10565b50505050905090565b60016020528160005260406000208181548110610cfc57600080fd5b60009182526020909120600490910201805460018201546002830180549295506001600160a01b03909116935090610d3390613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d5f90613fd5565b8015610dac5780601f10610d8157610100808354040283529160200191610dac565b820191906000526020600020905b815481529060010190602001808311610d8f57829003601f168201915b5050505050908060030154905084565b6001600160a01b0381166000908152600160209081526040808320805482518185028101850190935280835260609492939192909184015b82821015610ee257600084815260209081902060408051608081018252600486029092018054835260018101546001600160a01b03169383019390935260028301805492939291840191610e4790613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610e7390613fd5565b8015610ec05780601f10610e9557610100808354040283529160200191610ec0565b820191906000526020600020905b815481529060010190602001808311610ea357829003601f168201915b5050505050815260200160038201548152505081526020019060010190610df4565b505050509050919050565b600b546001600160a01b0316331480610f195750610f196000805160206149c283398151915233612008565b610f355760405162461bcd60e51b8152600401610a1390614009565b600a54811115610f575760405162461bcd60e51b8152600401610a1390613efb565b60008111610f775760405162461bcd60e51b8152600401610a1390613f29565b60006009610f8660018461406a565b81548110610f9657610f9661407d565b60009182526020909120600a90910201600981015490915060ff1615610ffe5760405162461bcd60e51b815260206004820152601760248201527f526f756e6420697320616c7265616479206163746976650000000000000000006044820152606401610a13565b428160070154116110435760405162461bcd60e51b815260206004820152600f60248201526e149bdd5b99081a185cc8195b991959608a1b6044820152606401610a13565b600901805460ff1916600117905550565b600b546001600160a01b0316331461107e5760405162461bcd60e51b8152600401610a1390614093565b6110966000805160206149c283398151915282612cb8565b50565b3360009081526001602052604081208054839081106110ba576110ba61407d565b6000918252602090912060049091020160018101549091506001600160a01b031633146111295760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920617574686f722063616e206170706c7920666f7220726f756e64006044820152606401610a13565b600a5483111561114b5760405162461bcd60e51b8152600401610a1390613efb565b6000831161116b5760405162461bcd60e51b8152600401610a1390613f29565b6000600961117a60018661406a565b8154811061118a5761118a61407d565b60009182526020909120600a90910201600981015490915060ff166111e75760405162461bcd60e51b8152602060048201526013602482015272526f756e64206973206e6f742061637469766560681b6044820152606401610a13565b4281600701541161122c5760405162461bcd60e51b815260206004820152600f60248201526e149bdd5b99081a185cc8195b991959608a1b6044820152606401610a13565b33600090815260016020526040902054831061125a5760405162461bcd60e51b8152600401610a1390613f60565b33600090815260056020908152604080832086845290915290208154815560018083015490820180546001600160a01b0319166001600160a01b039290921691909117905581906002808201906112b39084018261411b565b506003818101906112c69084018261411b565b5060048281015482820180546001600160a01b03199081166001600160a01b03938416179091556005808601549085015560068086015490850155600780860154908501556008808601549085015560099485015494909301805460ff909516151560ff1990951694909417909355600087815260208281526040822080546001818101835591845291909220875491909302909201918255858101549082018054909316931692909217905582906002808201906113879084018261411b565b50600391820154910155604080518481526020810186905233917f811c03f2bbb9360eb64c761297098be1002730230dcb29e79fe32df622aa76f2910160405180910390a250505050565b60008060096113e260018861406a565b815481106113f2576113f261407d565b90600052602060002090600a02019050600061140d87613040565b6001600160a01b038716600090815260076020908152604080832089845282528083208b8452909152812054919250600261144787613439565b61145190846141fc565b61145b91906142f3565b9050600061146a8a8a8a61177a565b905060008483876005015461147f9190614302565b6114899190614319565b9050611495828261406a565b9b9a5050505050505050505050565b6114d860405180608001604052806000815260200160006001600160a01b0316815260200160608152602001600081525090565b6001600160a01b03831660009081526001602052604090208054839081106115025761150261407d565b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200160028201805461156490613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461159090613fd5565b80156115dd5780601f106115b2576101008083540402835291602001916115dd565b820191906000526020600020905b8154815290600101906020018083116115c057829003601f168201915b50505050508152602001600382015481525050905092915050565b600560209081526000928352604080842090915290825290208054600182015460028301805492936001600160a01b039092169261163590613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461166190613fd5565b80156116ae5780601f10611683576101008083540402835291602001916116ae565b820191906000526020600020905b81548152906001019060200180831161169157829003601f168201915b5050505050908060030180546116c390613fd5565b80601f01602080910402602001604051908101604052809291908181526020018280546116ef90613fd5565b801561173c5780601f106117115761010080835404028352916020019161173c565b820191906000526020600020905b81548152906001019060200180831161171f57829003601f168201915b5050506004840154600585015460068601546007870154600888015460099098015496976001600160a01b0390941696929550909350919060ff168a565b6000600a5484111561179e5760405162461bcd60e51b8152600401610a1390613efb565b600084116117be5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03831660009081526001602052604090205482106117f55760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038316600090815260056020908152604080832085845290915290205484146118375760405162461bcd60e51b8152600401610a1390613f90565b600061184285613040565b6001600160a01b038516600090815260076020908152604080832087845282528083208984529091528120549192509061187e906002906142f3565b90506000600961188f60018961406a565b8154811061189f5761189f61407d565b90600052602060002090600a020190506000838383600501546118c29190614302565b6118cc9190614319565b98975050505050505050565b6000828152602081905260409020600101546118f381613492565b6118fd838361349c565b505050565b6001600160a01b03811633146119725760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610a13565b61197c8282613520565b5050565b600360205282600052604060002060205281600052604060002081815481106119a857600080fd5b6000918252602090912001546001600160a01b0316925083915050565b600b546001600160a01b03163314806119f157506119f16000805160206149c283398151915233612008565b611a0d5760405162461bcd60e51b8152600401610a1390614009565b6001600160a01b0382166000908152600660209081526040808320848452825280832086845290915281205460ff166002811115611a4d57611a4d6138f4565b14611a6a5760405162461bcd60e51b8152600401610a139061433b565b6001600160a01b03821660009081526006602090815260408083208484528252808320868452909152902080546002919060ff19166001835b0217905550505050565b600b546001600160a01b03163314611ad75760405162461bcd60e51b8152600401610a1390614093565b6110966000805160206149c283398151915282613585565b611b2360405180608001604052806000815260200160006001600160a01b0316815260200160608152602001600081525090565b600083815260046020526040902054611b4e5760405162461bcd60e51b8152600401610a139061437c565b60008381526004602052604090208054839081106115025761150261407d565b336000908152600160205260409020805483908110611b8f57611b8f61407d565b60009182526020909120600490910201600101546001600160a01b03163314611bfa5760405162461bcd60e51b815260206004820152601e60248201527f4f6e6c7920617574686f722063616e207570646174652061727469636c6500006044820152606401610a13565b6000815111611c455760405162461bcd60e51b8152602060048201526017602482015276436f6e74656e742063616e6e6f7420626520656d70747960481b6044820152606401610a13565b336000908152600160205260409020548210611c735760405162461bcd60e51b8152600401610a1390613f60565b336000908152600160205260408120805484908110611c9457611c9461407d565b9060005260206000209060040201905081816002019081611cb591906143aa565b50505050565b60098181548110611ccb57600080fd5b60009182526020909120600a90910201805460018201546002830180549294506001600160a01b03909116929161163590613fd5565b611d09613809565b600a54821115611d2b5760405162461bcd60e51b8152600401610a1390613efb565b60008211611d4b5760405162461bcd60e51b8152600401610a1390613f29565b6009611d5860018461406a565b81548110611d6857611d6861407d565b90600052602060002090600a020160405180610140016040529081600082015481526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b03168152602001600282018054611dcb90613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054611df790613fd5565b8015611e445780601f10611e1957610100808354040283529160200191611e44565b820191906000526020600020905b815481529060010190602001808311611e2757829003601f168201915b50505050508152602001600382018054611e5d90613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054611e8990613fd5565b8015611ed65780601f10611eab57610100808354040283529160200191611ed6565b820191906000526020600020905b815481529060010190602001808311611eb957829003601f168201915b505050918352505060048201546001600160a01b03166020820152600582015460408201526006820154606082015260078201546080820152600882015460a082015260099091015460ff16151560c09091015292915050565b60046020528160005260406000208181548110610cfc57600080fd5b6001600160a01b0382166000908152600160205260408120548210611f835760405162461bcd60e51b8152600401610a1390613f60565b600c546040516348e5949760e11b81526001600160a01b038681166004830152858116602483015260448201859052909116906391cb292e90606401602060405180830381865afa158015611fdc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120009190614464565b949350505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b612039613809565b6001600160a01b03831660009081526001602052604090205482106120705760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b0380841660009081526005602090815260408083208684528252918290208251610140810184528154815260018201549094169184019190915260028101805491928401916120c590613fd5565b80601f01602080910402602001604051908101604052809291908181526020018280546120f190613fd5565b801561213e5780601f106121135761010080835404028352916020019161213e565b820191906000526020600020905b81548152906001019060200180831161212157829003601f168201915b5050505050815260200160038201805461215790613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461218390613fd5565b80156121d05780601f106121a5576101008083540402835291602001916121d0565b820191906000526020600020905b8154815290600101906020018083116121b357829003601f168201915b505050918352505060048201546001600160a01b03166020820152600582015460408201526006820154606082015260078201546080820152600882015460a082015260099091015460ff16151560c0909101529392505050565b6000600a5482111561224f5760405162461bcd60e51b8152600401610a1390613efb565b6000821161226f5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03841660009081526001602052604090205483106122a65760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038416600090815260056020908152604080832086845290915290205482146122e85760405162461bcd60e51b8152600401610a1390613f90565b506001600160a01b038316600090815260076020908152604080832085845282528083208484529091529020549392505050565b6000600a548411156123405760405162461bcd60e51b8152600401610a1390613efb565b600084116123605760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03831660009081526001602052604090205482106123975760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038316600090815260056020908152604080832085845290915290205484146123d95760405162461bcd60e51b8152600401610a1390613f90565b5060009283526008602090815260408085206001600160a01b039490941685529281528284209184525290205490565b6000600a5482111561242d5760405162461bcd60e51b8152600401610a1390613efb565b6000821161244d5760405162461bcd60e51b8152600401610a1390613f29565b343331101561249e5760405162461bcd60e51b815260206004820152601d60248201527f4e6f7420656e6f7567682062616c616e636520746f206465706f7369740000006044820152606401610a13565b600060096124ad60018561406a565b815481106124bd576124bd61407d565b600091825260208220600a919091020160048101546040519193506001600160a01b03169190829034908381818185875af1925050503d806000811461251f576040519150601f19603f3d011682016040523d82523d6000602084013e612524565b606091505b50509050806125755760405162461bcd60e51b815260206004820152601760248201527f4661696c656420746f206465706f7369742045746865720000000000000000006044820152606401610a13565b3483600501600082825461258991906141fc565b909155509095945050505050565b6001600160a01b03821660009081526001602052604081205482106125ce5760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b03831660009081526001602052604090208054839081106125f8576125f861407d565b906000526020600020906004020160030154905092915050565b600b546001600160a01b031633148061263e575061263e6000805160206149c283398151915233612008565b61265a5760405162461bcd60e51b8152600401610a1390614009565b600a5481111561267c5760405162461bcd60e51b8152600401610a1390613efb565b6000811161269c5760405162461bcd60e51b8152600401610a1390613f29565b600060096126ab60018461406a565b815481106126bb576126bb61407d565b90600052602060002090600a0201905060006126d683613040565b6000848152600460205260409020549091506127045760405162461bcd60e51b8152600401610a139061437c565b60005b600084815260046020526040902054811015611cb557600084815260046020526040812080548390811061273d5761273d61407d565b600091825260208083206001600490930201918201546001600160a01b03168352600781526040808420835485528252808420898552909152822054909250612788906002906142f3565b905060008482876005015461279d9190614302565b6127a79190614319565b600088815260086020908152604080832060018801546001600160a01b031684528252808320875484529091529020819055905080156129095760048681015460018501546040516330cb4c5b60e21b81526001600160a01b03918216938101939093526024830184905260009291169063c32d316c906044016020604051808303816000875af1158015612840573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128649190614464565b9050806128b35760405162461bcd60e51b815260206004820152601a60248201527f416c6c6f636174696f6e207472616e73666572206661696c65640000000000006044820152606401610a13565b60018401548454604080516001600160a01b0390931683526020830191909152810183905288907f0ce65a112a335d2d5fc972d2f7d916ac65b9c552cca921234bb7846404f7cf179060600160405180910390a2505b505050808061291790614486565b915050612707565b6001600160a01b03821633036129775760405162461bcd60e51b815260206004820152601c60248201527f617574686f722063616e6e6f7420646f6e61746520746f2073656c66000000006044820152606401610a13565b66038d7ea4c6800034116129e25760405162461bcd60e51b815260206004820152602c60248201527f646f6e6174696f6e206d7573742062652067726561746572207468616e206d6960448201526b1b9a5b5d5b48185b5bdd5b9d60a21b6064820152608401610a13565b6001600160a01b0382166000908152600160205260409020548110612a195760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b0382166000908152600160205260408120805483908110612a4357612a4361407d565b906000526020600020906004020190506000836001600160a01b03163460405160006040518083038185875af1925050503d8060008114612aa0576040519150601f19603f3d011682016040523d82523d6000602084013e612aa5565b606091505b5050905080612aef5760405162461bcd60e51b81526020600482015260166024820152752330b4b632b2103a37903237b730ba329022ba3432b960511b6044820152606401610a13565b6001600160a01b03841660009081526003602081815260408084208785528252832080546001810182559084529083200180546001600160a01b0319163317905583018054349290612b429084906141fc565b90915550506001600160a01b03841660009081526002602052604081208054349290612b6f9084906141fc565b90915550506001600160a01b03841660009081526005602090815260408083208684529091529020600981015460ff1615612bef57612bad34613439565b6001600160a01b038616600090815260076020908152604080832088845282528083208554845290915281208054909190612be99084906141fc565b90915550505b6040805185815234602082015233916001600160a01b038816917f156f4e4409ddebc945c5614a72c50315673686ffb291cac167b0409de20f291b910160405180910390a3600c5460405163b85cbc7960e01b81526001600160a01b039091169063b85cbc7990612c6d9033908990899060028a019060040161449f565b6020604051808303816000875af1158015612c8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cb09190614550565b505050505050565b600082815260208190526040902060010154612cd381613492565b6118fd8383613520565b60006109e982613439565b60006109e96000805160206149c283398151915283612008565b612d0a613809565b600b546001600160a01b0316331480612d365750612d366000805160206149c283398151915233612008565b612d525760405162461bcd60e51b8152600401610a1390614009565b818310612dac5760405162461bcd60e51b815260206004820152602260248201527f53746172742064617465206d757374206265206265666f726520656e64206461604482015261746560f01b6064820152608401610a13565b428211612dfb5760405162461bcd60e51b815260206004820152601e60248201527f456e642064617465206d75737420626520696e207468652066757475726500006044820152606401610a13565b6000612e0886858561358f565b9050600085604051602001612e1d9190614569565b60405160208183030381529060405290506000604051806101400160405280600a546001612e4b91906141fc565b8152600b546001600160a01b0390811660208084019190915260408084018d9052606084018790528783166080850152600060a0850181905260c085018c905260e085018b90524261010086015261012090940184905260098054600181018255945284517f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af600a909502948501908155918501517f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7b0850180546001600160a01b031916919094161790925590830151929350839290917f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7b10190612f4f90826143aa565b5060608201516003820190612f6490826143aa565b5060808201516004820180546001600160a01b0319166001600160a01b0390921691909117905560a0820151600582015560c0820151600682015560e082015160078201556101008201516008820155610120909101516009909101805460ff1916911515919091179055600a5433907f54f1e700602fe6f1e920566675fa34d9f2ce7d06894c9369be2e0fecd1ca40359085906130039060016141fc565b8b8a8a604051613017959493929190614585565b60405180910390a2600a805490600061302f83614486565b909155509098975050505050505050565b600080805b600084815260046020526040902054811015613112576000848152600460205260409020546130865760405162461bcd60e51b8152600401610a139061437c565b60008481526004602052604081208054839081106130a6576130a661407d565b600091825260208083206001600490930201918201546001600160a01b03168352600781526040808420835485528252808420898552909152909120549091506130f16002826142f3565b6130fb90856141fc565b93505050808061310a90614486565b915050613045565b5092915050565b600b546001600160a01b031633148061314557506131456000805160206149c283398151915233612008565b6131615760405162461bcd60e51b8152600401610a1390614009565b600a548111156131835760405162461bcd60e51b8152600401610a1390613efb565b600081116131a35760405162461bcd60e51b8152600401610a1390613f29565b600060096131b260018461406a565b815481106131c2576131c261407d565b60009182526020909120600a90910201600981015490915060ff1661321f5760405162461bcd60e51b8152602060048201526013602482015272526f756e64206973206e6f742061637469766560681b6044820152606401610a13565b600901805460ff1916905550565b600b546001600160a01b031633148061325957506132596000805160206149c283398151915233612008565b6132755760405162461bcd60e51b8152600401610a1390614009565b6001600160a01b0382166000908152600660209081526040808320848452825280832086845290915281205460ff1660028111156132b5576132b56138f4565b146132d25760405162461bcd60e51b8152600401610a139061433b565b6001600160a01b03821660009081526006602090815260408083208484528252808320868452909152902080546001919060ff19168280611aa3565b60008082511161335a5760405162461bcd60e51b8152602060048201526017602482015276436f6e74656e742063616e6e6f7420626520656d70747960481b6044820152606401610a13565b3360008181526001602081815260408084208054825160808101845281815280850197885292830189815260608401879052858552818601835591865292909420815160048402909101908155945192850180546001600160a01b0319166001600160a01b039094169390931790925591519192909182919060028201906133e290826143aa565b50606082015181600301555050336001600160a01b03167f8287f7cb9ee4a80a03db149d7cce31b9dc4803c6746c41e6131a5da3fbe392fa858460405161342a9291906145c0565b60405180910390a25092915050565b60008060026134498460016141fc565b6134539190614319565b90508291505b8181101561348c579050806002816134718186614319565b61347b91906141fc565b6134859190614319565b9050613459565b50919050565b61109681336135fb565b6134a68282612008565b61197c576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556134dc3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61352a8282612008565b1561197c576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b61197c828261349c565b600080604051806020016135a290613870565b6020820181038252601f19601f82011660405250905060008585856040516020016135cf939291906145e2565b604051602081830303815290604052805190602001209050808251602084016000f59695505050505050565b6136058282612008565b61197c5761361281613654565b61361d836020613666565b60405160200161362e929190614609565b60408051601f198184030181529082905262461bcd60e51b8252610a139160040161467e565b60606109e96001600160a01b03831660145b60606000613675836002614302565b6136809060026141fc565b67ffffffffffffffff81111561369857613698613d25565b6040519080825280601f01601f1916602001820160405280156136c2576020820181803683370190505b509050600360fc1b816000815181106136dd576136dd61407d565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061370c5761370c61407d565b60200101906001600160f81b031916908160001a9053506000613730846002614302565b61373b9060016141fc565b90505b60018111156137b3576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061376f5761376f61407d565b1a60f81b8282815181106137855761378561407d565b60200101906001600160f81b031916908160001a90535060049490941c936137ac81614691565b905061373e565b5083156138025760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a13565b9392505050565b6040518061014001604052806000815260200160006001600160a01b03168152602001606081526020016060815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000151581525090565b610319806146a983390190565b60006020828403121561388f57600080fd5b81356001600160e01b03198116811461380257600080fd5b6001600160a01b038116811461109657600080fd5b6000806000606084860312156138d157600080fd5b8335925060208401356138e3816138a7565b929592945050506040919091013590565b634e487b7160e01b600052602160045260246000fd5b602081016003831061392c57634e487b7160e01b600052602160045260246000fd5b91905290565b60005b8381101561394d578181015183820152602001613935565b50506000910152565b6000815180845261396e816020860160208601613932565b601f01601f19169290920160200192915050565b60006101408251845260208301516139a560208601826001600160a01b03169052565b5060408301518160408601526139bd82860182613956565b915050606083015184820360608601526139d78282613956565b91505060808301516139f460808601826001600160a01b03169052565b5060a083015160a085015260c083015160c085015260e083015160e085015261010080840151818601525061012080840151613a338287018215159052565b5090949350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015613a9257603f19888603018452613a80858351613982565b94509285019290850190600101613a64565b5092979650505050505050565b60008060408385031215613ab257600080fd5b8235613abd816138a7565b946020939093013593505050565b8481526001600160a01b0384166020820152608060408201819052600090613af590830185613956565b905082606083015295945050505050565b600060208284031215613b1857600080fd5b8135613802816138a7565b8051825260018060a01b0360208201511660208301526000604082015160806040850152613b546080850182613956565b606093840151949093019390935250919050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015613a9257603f19888603018452613bab858351613b23565b94509285019290850190600101613b8f565b600060208284031215613bcf57600080fd5b5035919050565b60008060408385031215613be957600080fd5b50508035926020909101359150565b60008060008060808587031215613c0e57600080fd5b843593506020850135613c20816138a7565b93969395505050506040820135916060013590565b6020815260006138026020830184613b23565b8a81526001600160a01b038a8116602083015261014060408301819052600091613c748483018d613956565b91508382036060850152613c88828c613956565b99166080840152505060a081019590955260c085019390935260e0840191909152610100830152151561012090910152949350505050565b60008060408385031215613cd357600080fd5b823591506020830135613ce5816138a7565b809150509250929050565b600080600060608486031215613d0557600080fd5b8335613d10816138a7565b95602085013595506040909401359392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112613d4c57600080fd5b813567ffffffffffffffff80821115613d6757613d67613d25565b604051601f8301601f19908116603f01168101908282118183101715613d8f57613d8f613d25565b81604052838152866020858801011115613da857600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215613ddb57600080fd5b82359150602083013567ffffffffffffffff811115613df957600080fd5b613e0585828601613d3b565b9150509250929050565b6020815260006138026020830184613982565b600080600060608486031215613e3757600080fd5b8335613e42816138a7565b925060208401356138e3816138a7565b60008060008060808587031215613e6857600080fd5b843567ffffffffffffffff80821115613e8057600080fd5b613e8c88838901613d3b565b95506020870135915080821115613ea257600080fd5b50613eaf87828801613d3b565b949794965050505060408301359260600135919050565b600060208284031215613ed857600080fd5b813567ffffffffffffffff811115613eef57600080fd5b61200084828501613d3b565b602080825260149082015273149bdd5b9908191bd95cc81b9bdd08195e1a5cdd60621b604082015260600190565b60208082526018908201527f526f756e644964203020646f6573206e6f742065786973740000000000000000604082015260600190565b602080825260169082015275105c9d1a58db1948191bd95cc81b9bdd08195e1a5cdd60521b604082015260600190565b60208082526025908201527f417574686f7220686173206e6f74206170706c69656420666f722074686973206040820152641c9bdd5b9960da1b606082015260800190565b600181811c90821680613fe957607f821691505b60208210810361348c57634e487b7160e01b600052602260045260246000fd5b6020808252602b908201527f4f6e6c79206f776e6572206f722061646d696e2063616e2063616c6c2074686960408201526a3990333ab731ba34b7b71760a91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156109e9576109e9614054565b634e487b7160e01b600052603260045260246000fd5b60208082526022908201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f604082015261371760f11b606082015260800190565b601f8211156118fd57600081815260208120601f850160051c810160208610156140fc5750805b601f850160051c820191505b81811015612cb057828155600101614108565b818103614126575050565b6141308254613fd5565b67ffffffffffffffff81111561414857614148613d25565b61415c816141568454613fd5565b846140d5565b6000601f82116001811461419057600083156141785750848201545b600019600385901b1c1916600184901b1784556141f5565b600085815260209020601f19841690600086815260209020845b838110156141ca57828601548255600195860195909101906020016141aa565b50858310156141e85781850154600019600388901b60f8161c191681555b50505060018360011b0184555b5050505050565b808201808211156109e9576109e9614054565b600181815b8085111561424a57816000190482111561423057614230614054565b8085161561423d57918102915b93841c9390800290614214565b509250929050565b600082614261575060016109e9565b8161426e575060006109e9565b8160018114614284576002811461428e576142aa565b60019150506109e9565b60ff84111561429f5761429f614054565b50506001821b6109e9565b5060208310610133831016604e8410600b84101617156142cd575081810a6109e9565b6142d7838361420f565b80600019048211156142eb576142eb614054565b029392505050565b600061380260ff841683614252565b80820281158282048414176109e9576109e9614054565b60008261433657634e487b7160e01b600052601260045260246000fd5b500490565b60208082526021908201527f4170706c69636174696f6e20737461747573206973206e6f742050656e64696e6040820152606760f81b606082015260800190565b602080825260149082015273139bc8185c9d1a58db195cc81a5b881c9bdd5b9960621b604082015260600190565b815167ffffffffffffffff8111156143c4576143c4613d25565b6143d2816141568454613fd5565b602080601f83116001811461440757600084156143ef5750858301515b600019600386901b1c1916600185901b178555612cb0565b600085815260208120601f198616915b8281101561443657888601518255948401946001909101908401614417565b50858210156144545787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561447657600080fd5b8151801515811461380257600080fd5b60006001820161449857614498614054565b5060010190565b6001600160a01b03858116825284166020808301919091526040820184905260806060830152825460009182916144d581613fd5565b80608087015260a06001808416600081146144f757600181146145115761453f565b60ff1985168984015283151560051b89018301965061453f565b896000528560002060005b858110156145375781548b820186015290830190870161451c565b8a0184019750505b50949b9a5050505050505050505050565b60006020828403121561456257600080fd5b5051919050565b6000825161457b818460208701613932565b9190910192915050565b60018060a01b038616815284602082015260a0604082015260006145ac60a0830186613956565b606083019490945250608001529392505050565b6040815260006145d36040830185613956565b90508260208301529392505050565b600084516145f4818460208901613932565b91909101928352506020820152604001919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614641816017850160208801613932565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614672816028840160208801613932565b01602801949350505050565b6020815260006138026020830184613956565b6000816146a0576146a0614054565b50600019019056fe608060405234801561001057600080fd5b50600080546001600160a01b031916331790556102e7806100326000396000f3fe6080604052600436106100385760003560e01c806312065fe0146100445780638da5cb5b14610064578063c32d316c1461009c57600080fd5b3661003f57005b600080fd5b34801561005057600080fd5b506040514781526020015b60405180910390f35b34801561007057600080fd5b50600054610084906001600160a01b031681565b6040516001600160a01b03909116815260200161005b565b3480156100a857600080fd5b506100bc6100b7366004610279565b6100cc565b604051901515815260200161005b565b600080546001600160a01b031633146101375760405162461bcd60e51b815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f604482015261371760f11b60648201526084015b60405180910390fd5b814710156101875760405162461bcd60e51b815260206004820152601760248201527f4e6f7420656e6f75676820706f6f6c2062616c616e6365000000000000000000604482015260640161012e565b6001600160a01b0383166101cf5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b604482015260640161012e565b6000836001600160a01b03168360405160006040518083038185875af1925050503d806000811461021c576040519150601f19603f3d011682016040523d82523d6000602084013e610221565b606091505b50509050806102725760405162461bcd60e51b815260206004820152601760248201527f4661696c656420746f20706f6f6c207472616e73666572000000000000000000604482015260640161012e565b9392505050565b6000806040838503121561028c57600080fd5b82356001600160a01b03811681146102a357600080fd5b94602093909301359350505056fea2646970667358221220997bda3b53bd32a43443b84bc3a733dc1a90bfd33c310c694bef522349c9eba164736f6c63430008130033a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a2646970667358221220b87a4347c87be94ee0c8f9737649eaa5af2e5a6a634eba4798a69e351b7b72fa64736f6c6343000813003360806040523480156200001157600080fd5b506040516200312c3803806200312c833981016040819052620000349162000169565b6040518060400160405280601781526020017f506c65646765506f737420446f6e6174696f6e204e4654000000000000000000815250604051806040016040528060078152602001661413141113919560ca1b81525081600090816200009b9190620002ee565b506001620000aa8282620002ee565b505050620000c7620000c1620000fd60201b60201c565b62000101565b600e620000d58282620002ee565b5050600c80546001600160a01b0319166001600160a01b0392909216919091179055620003ba565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156200017d57600080fd5b82516001600160a01b03811681146200019557600080fd5b602084810151919350906001600160401b0380821115620001b557600080fd5b818601915086601f830112620001ca57600080fd5b815181811115620001df57620001df62000153565b604051601f8201601f19908116603f011681019083821181831017156200020a576200020a62000153565b8160405282815289868487010111156200022357600080fd5b600093505b8284101562000247578484018601518185018701529285019262000228565b60008684830101528096505050505050509250929050565b600181811c908216806200027457607f821691505b6020821081036200029557634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002e957600081815260208120601f850160051c81016020861015620002c45750805b601f850160051c820191505b81811015620002e557828155600101620002d0565b5050505b505050565b81516001600160401b038111156200030a576200030a62000153565b62000322816200031b84546200025f565b846200029b565b602080601f8311600181146200035a5760008415620003415750858301515b600019600386901b1c1916600185901b178555620002e5565b600085815260208120601f198616915b828110156200038b578886015182559484019460019091019084016200036a565b5085821015620003aa5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b612d6280620003ca6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c8063715018a6116100de578063b80f55c911610097578063b8bdd24511610071578063b8bdd2451461031f578063c87b56dd14610332578063e985e9c514610345578063f2fde38b1461038157600080fd5b8063b80f55c9146102e6578063b85cbc79146102f9578063b88d4fde1461030c57600080fd5b8063715018a61461028c5780638da5cb5b1461029457806391cb292e146102a557806395d89b41146102b8578063a22cb465146102c0578063a660864d146102d357600080fd5b806323b872dd1161013057806323b872dd1461021a5780632f745c591461022d57806342842e0e146102405780634f6ccce7146102535780636352211e1461026657806370a082311461027957600080fd5b806301ffc9a71461017857806306fdde03146101a0578063081812fc146101b5578063095ea7b3146101e057806318160ddd146101f55780631ab4d7de14610207575b600080fd5b61018b61018636600461219f565b610394565b60405190151581526020015b60405180910390f35b6101a86103bf565b604051610197919061220c565b6101c86101c336600461221f565b610451565b6040516001600160a01b039091168152602001610197565b6101f36101ee366004612254565b610478565b005b6008545b604051908152602001610197565b6101a861021536600461221f565b610592565b6101f361022836600461227e565b6107cf565b6101f961023b366004612254565b610800565b6101f361024e36600461227e565b610896565b6101f961026136600461221f565b6108b1565b6101c861027436600461221f565b610944565b6101f96102873660046122ba565b6109a4565b6101f3610a2a565b600a546001600160a01b03166101c8565b61018b6102b336600461227e565b610a3e565b6101a8610c40565b6101f36102ce3660046122d5565b610c4f565b6101f36102e13660046123d0565b610c5e565b6101f36102f4366004612405565b610c72565b6101f96103073660046124ab565b610d02565b6101f361031a366004612513565b610efd565b6101f361032d366004612583565b610f35565b6101a861034036600461221f565b610fd6565b61018b6103533660046125ca565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101f361038f3660046122ba565b6112b8565b60006001600160e01b031982166380ac58cd60e01b14806103b957506103b982611331565b92915050565b6060600080546103ce906125fd565b80601f01602080910402602001604051908101604052809291908181526020018280546103fa906125fd565b80156104475780601f1061041c57610100808354040283529160200191610447565b820191906000526020600020905b81548152906001019060200180831161042a57829003601f168201915b5050505050905090565b600061045c82611356565b506000908152600460205260409020546001600160a01b031690565b600061048382610944565b9050806001600160a01b0316836001600160a01b0316036104f55760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061051157506105118133610353565b6105835760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016104ec565b61058d83836113a6565b505050565b606061059d82611414565b6105b95760405162461bcd60e51b81526004016104ec90612637565b6000828152600d60209081526040808320815160a08101835281546001600160a01b0390811682526001830154169381019390935260028101549183019190915260038101805460608401919061060f906125fd565b80601f016020809104026020016040519081016040528092919081815260200182805461063b906125fd565b80156106885780601f1061065d57610100808354040283529160200191610688565b820191906000526020600020905b81548152906001019060200180831161066b57829003601f168201915b505050505081526020016004820180546106a1906125fd565b80601f01602080910402602001604051908101604052809291908181526020018280546106cd906125fd565b801561071a5780601f106106ef5761010080835404028352916020019161071a565b820191906000526020600020905b8154815290600101906020018083116106fd57829003601f168201915b50505050508152505090506000816080015151116107c257600e805461073f906125fd565b80601f016020809104026020016040519081016040528092919081815260200182805461076b906125fd565b80156107b85780601f1061078d576101008083540402835291602001916107b8565b820191906000526020600020905b81548152906001019060200180831161079b57829003601f168201915b50505050506107c8565b80608001515b9392505050565b6107d93382611431565b6107f55760405162461bcd60e51b81526004016104ec9061266e565b61058d8383836114af565b600061080b836109a4565b821061086d5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016104ec565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61058d83838360405180602001604052806000815250610efd565b60006108bc60085490565b821061091f5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016104ec565b60088281548110610932576109326126bb565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806103b95760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104ec565b60006001600160a01b038216610a0e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016104ec565b506001600160a01b031660009081526003602052604090205490565b610a32611620565b610a3c600061167a565b565b600080610a4a60085490565b905060005b81811015610c34576000818152600d60209081526040808320815160a08101835281546001600160a01b03908116825260018301541693810193909352600281015491830191909152600381018054606084019190610aad906125fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad9906125fd565b8015610b265780601f10610afb57610100808354040283529160200191610b26565b820191906000526020600020905b815481529060010190602001808311610b0957829003601f168201915b50505050508152602001600482018054610b3f906125fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610b6b906125fd565b8015610bb85780601f10610b8d57610100808354040283529160200191610bb8565b820191906000526020600020905b815481529060010190602001808311610b9b57829003601f168201915b5050505050815250509050856001600160a01b031681602001516001600160a01b0316148015610beb5750848160400151145b8015610c105750866001600160a01b0316610c0583610944565b6001600160a01b0316145b15610c2157600193505050506107c8565b5080610c2c816126e7565b915050610a4f565b50600095945050505050565b6060600180546103ce906125fd565b610c5a3383836116cc565b5050565b610c66611620565b600e610c5a828261274e565b60005b8151811015610c5a57610ca0828281518110610c9357610c936126bb565b602002602001015161179a565b818181518110610cb257610cb26126bb565b6020026020010151336001600160a01b03167f696de425f79f4a40bc6d2122ca50507f0efbeabbff86a84871b7196ab8ea8df760405160405180910390a380610cfa816126e7565b915050610c75565b6000610d0c611620565b6001600160a01b038516610d5b5760405162461bcd60e51b81526020600482015260166024820152754d696e7465722061646472657373206973207a65726f60501b60448201526064016104ec565b6001600160a01b038416610daa5760405162461bcd60e51b8152602060048201526016602482015275417574686f722061646472657373206973207a65726f60501b60448201526064016104ec565b6000825111610df25760405162461bcd60e51b81526020600482015260146024820152734465736372697074696f6e20697320656d70747960601b60448201526064016104ec565b6000610dfd600b5490565b9050610e0d600b80546001019055565b610e17868261183d565b6000818152600d6020526040902080546001600160a01b0319166001600160a01b03881617815560038101610e4c858261274e565b506001810180546001600160a01b0319166001600160a01b03881617905560028101859055600481018054610e80906125fd565b9050600003610e9a5760048101610e98600e8261280e565b505b84866001600160a01b0316886001600160a01b03167f5abfec23ced2338c97ba48e11a6a9e3c3d4af136e1ba56eab6b06567453977208542604051610ee9929190918252602082015260400190565b60405180910390a45090505b949350505050565b610f073383611431565b610f235760405162461bcd60e51b81526004016104ec9061266e565b610f2f84848484611857565b50505050565b610f3d611620565b610f4682611414565b610f625760405162461bcd60e51b81526004016104ec90612637565b6000610f6d83610944565b6001600160a01b031603610fba5760405162461bcd60e51b8152602060048201526014602482015273151bdad95b88191bd95cc81b9bdd08195e1a5cdd60621b60448201526064016104ec565b6000828152600d6020526040902060048101610f2f838261274e565b6060610fe182611414565b610ffd5760405162461bcd60e51b81526004016104ec90612637565b6000828152600d60209081526040808320815160a08101835281546001600160a01b03908116825260018301541693810193909352600281015491830191909152600381018054606084019190611053906125fd565b80601f016020809104026020016040519081016040528092919081815260200182805461107f906125fd565b80156110cc5780601f106110a1576101008083540402835291602001916110cc565b820191906000526020600020905b8154815290600101906020018083116110af57829003601f168201915b505050505081526020016004820180546110e5906125fd565b80601f0160208091040260200160405190810160405280929190818152602001828054611111906125fd565b801561115e5780601f106111335761010080835404028352916020019161115e565b820191906000526020600020905b81548152906001019060200180831161114157829003601f168201915b505050505081525050905060006111748461188a565b8260200151611186846040015161188a565b604051602001611198939291906128fd565b60405160208183030381529060405290506000808360800151511161124757600e80546111c4906125fd565b80601f01602080910402602001604051908101604052809291908181526020018280546111f0906125fd565b801561123d5780601f106112125761010080835404028352916020019161123d565b820191906000526020600020905b81548152906001019060200180831161122057829003601f168201915b505050505061124d565b82608001515b9050600061125a8661188a565b846060015183856040516020016112749493929190612a56565b604051602081830303815290604052905061128e8161191d565b60405160200161129e9190612b4b565b604051602081830303815290604052945050505050919050565b6112c0611620565b6001600160a01b0381166113255760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104ec565b61132e8161167a565b50565b60006001600160e01b0319821663780e9d6360e01b14806103b957506103b982611a70565b61135f81611414565b61132e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016104ec565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906113db82610944565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000908152600260205260409020546001600160a01b0316151590565b60008061143d83610944565b9050806001600160a01b0316846001600160a01b0316148061148457506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610ef55750836001600160a01b031661149d84610451565b6001600160a01b031614949350505050565b826001600160a01b03166114c282610944565b6001600160a01b0316146114e85760405162461bcd60e51b81526004016104ec90612b90565b6001600160a01b03821661154a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104ec565b6115578383836001611ac0565b826001600160a01b031661156a82610944565b6001600160a01b0316146115905760405162461bcd60e51b81526004016104ec90612b90565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600a546001600160a01b03163314610a3c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104ec565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03160361172d5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104ec565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60006117a582610944565b90506117b5816000846001611ac0565b6117be82610944565b600083815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526003845282852080546000190190558785526002909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610c5a828260405180602001604052806000815250611b41565b6118628484846114af565b61186e84848484611b74565b610f2f5760405162461bcd60e51b81526004016104ec90612bd5565b6060600061189783611c72565b600101905060008167ffffffffffffffff8111156118b7576118b7612311565b6040519080825280601f01601f1916602001820160405280156118e1576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846118eb57509392505050565b6060815160000361193c57505060408051602081019091526000815290565b6000604051806060016040528060408152602001612ced604091399050600060038451600261196b9190612c27565b6119759190612c3a565b611980906004612c5c565b67ffffffffffffffff81111561199857611998612311565b6040519080825280601f01601f1916602001820160405280156119c2576020820181803683370190505b509050600182016020820185865187015b80821015611a2e576003820191508151603f8160121c168501518453600184019350603f81600c1c168501518453600184019350603f8160061c168501518453600184019350603f81168501518453506001830192506119d3565b5050600386510660018114611a4a5760028114611a5d57611a65565b603d6001830353603d6002830353611a65565b603d60018303535b509195945050505050565b60006001600160e01b031982166380ac58cd60e01b1480611aa157506001600160e01b03198216635b5e139f60e01b145b806103b957506301ffc9a760e01b6001600160e01b03198316146103b9565b6001600160a01b0384161580611add57506001600160a01b038316155b611b355760405162461bcd60e51b815260206004820152602360248201527f4572723a205468697320746f6b656e206973206e6f74207472616e7366657261604482015262626c6560e81b60648201526084016104ec565b610f2f84848484611d4a565b611b4b8383611e7e565b611b586000848484611b74565b61058d5760405162461bcd60e51b81526004016104ec90612bd5565b60006001600160a01b0384163b15611c6a57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611bb8903390899088908890600401612c73565b6020604051808303816000875af1925050508015611bf3575060408051601f3d908101601f19168201909252611bf091810190612ca6565b60015b611c50573d808015611c21576040519150601f19603f3d011682016040523d82523d6000602084013e611c26565b606091505b508051600003611c485760405162461bcd60e51b81526004016104ec90612bd5565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610ef5565b506001610ef5565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310611cb15772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611cdd576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611cfb57662386f26fc10000830492506010015b6305f5e1008310611d13576305f5e100830492506008015b6127108310611d2757612710830492506004015b60648310611d39576064830492506002015b600a83106103b95760010192915050565b6001811115611db95760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e7365637574697665207472604482015274185b9cd9995c9cc81b9bdd081cdd5c1c1bdc9d1959605a1b60648201526084016104ec565b816001600160a01b038516611e1557611e1081600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611e38565b836001600160a01b0316856001600160a01b031614611e3857611e388582611ff9565b6001600160a01b038416611e5457611e4f81612096565b611e77565b846001600160a01b0316846001600160a01b031614611e7757611e778482612145565b5050505050565b6001600160a01b038216611ed45760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104ec565b611edd81611414565b15611f2a5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104ec565b611f38600083836001611ac0565b611f4181611414565b15611f8e5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016104ec565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001612006846109a4565b6120109190612cc3565b600083815260076020526040902054909150808214612063576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906120a890600190612cc3565b600083815260096020526040812054600880549394509092849081106120d0576120d06126bb565b9060005260206000200154905080600883815481106120f1576120f16126bb565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061212957612129612cd6565b6001900381819060005260206000200160009055905550505050565b6000612150836109a4565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160e01b03198116811461132e57600080fd5b6000602082840312156121b157600080fd5b81356107c881612189565b60005b838110156121d75781810151838201526020016121bf565b50506000910152565b600081518084526121f88160208601602086016121bc565b601f01601f19169290920160200192915050565b6020815260006107c860208301846121e0565b60006020828403121561223157600080fd5b5035919050565b80356001600160a01b038116811461224f57600080fd5b919050565b6000806040838503121561226757600080fd5b61227083612238565b946020939093013593505050565b60008060006060848603121561229357600080fd5b61229c84612238565b92506122aa60208501612238565b9150604084013590509250925092565b6000602082840312156122cc57600080fd5b6107c882612238565b600080604083850312156122e857600080fd5b6122f183612238565b91506020830135801515811461230657600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561235057612350612311565b604052919050565b600067ffffffffffffffff83111561237257612372612311565b612385601f8401601f1916602001612327565b905082815283838301111561239957600080fd5b828260208301376000602084830101529392505050565b600082601f8301126123c157600080fd5b6107c883833560208501612358565b6000602082840312156123e257600080fd5b813567ffffffffffffffff8111156123f957600080fd5b610ef5848285016123b0565b6000602080838503121561241857600080fd5b823567ffffffffffffffff8082111561243057600080fd5b818501915085601f83011261244457600080fd5b81358181111561245657612456612311565b8060051b9150612467848301612327565b818152918301840191848101908884111561248157600080fd5b938501935b8385101561249f57843582529385019390850190612486565b98975050505050505050565b600080600080608085870312156124c157600080fd5b6124ca85612238565b93506124d860208601612238565b925060408501359150606085013567ffffffffffffffff8111156124fb57600080fd5b612507878288016123b0565b91505092959194509250565b6000806000806080858703121561252957600080fd5b61253285612238565b935061254060208601612238565b925060408501359150606085013567ffffffffffffffff81111561256357600080fd5b8501601f8101871361257457600080fd5b61250787823560208401612358565b6000806040838503121561259657600080fd5b82359150602083013567ffffffffffffffff8111156125b457600080fd5b6125c0858286016123b0565b9150509250929050565b600080604083850312156125dd57600080fd5b6125e683612238565b91506125f460208401612238565b90509250929050565b600181811c9082168061261157607f821691505b60208210810361263157634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252601f908201527f55524920717565727920666f72206e6f6e6578697374656e7420746f6b656e00604082015260600190565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016126f9576126f96126d1565b5060010190565b601f82111561058d57600081815260208120601f850160051c810160208610156127275750805b601f850160051c820191505b8181101561274657828155600101612733565b505050505050565b815167ffffffffffffffff81111561276857612768612311565b61277c8161277684546125fd565b84612700565b602080601f8311600181146127b157600084156127995750858301515b600019600386901b1c1916600185901b178555612746565b600085815260208120601f198616915b828110156127e0578886015182559484019460019091019084016127c1565b50858210156127fe5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b818103612819575050565b61282382546125fd565b67ffffffffffffffff81111561283b5761283b612311565b6128498161277684546125fd565b6000601f82116001811461287d57600083156128655750848201545b600019600385901b1c1916600184901b178455611e77565b600085815260209020601f19841690600086815260209020845b838110156128b75782860154825560019586019590910190602001612897565b50858310156127fe5793015460001960f8600387901b161c19169092555050600190811b01905550565b600081516128f38185602086016121bc565b9290920192915050565b7f7b2274726169745f74797065223a20224944222c202276616c7565223a20220081526000845161293581601f8501602089016121bc565b62089f4b60ea1b601f918401918201527f7b2274726169745f74797065223a20226e616d65222c202276616c7565223a206022820152601160f91b60428201527f506c65646765506f737420446f6e6174696f6e204e4654000000000000000000604382015261227d60f01b605a8201527f7b2274726169745f74797065223a2022617574686f72222c202276616c756522605c820152621d101160e91b607c820152606085901b6bffffffffffffffffffffffff1916607f820152612a4c612a3e612a38609384017f227d7b2274726169745f74797065223a202261727469636c654964222c20227681526730b63ab2911d101160c11b602082015260280190565b866128e1565b61227d60f01b815260020190565b9695505050505050565b7f7b226e616d65223a2022506c65646765506f737420446f6e6174696f6e204e4681526254202360e81b602082015260008551612a9a816023850160208a016121bc565b72111610113232b9b1b934b83a34b7b7111d101160691b6023918401918201528551612acd816036840160208a016121bc565b6c1116101134b6b0b3b2911d101160991b603692909101918201528451612afb8160438401602089016121bc565b71222c202261747472696275746573223a205b60701b604392909101918201528351612b2e8160558401602088016121bc565b615d7d60f01b605592909101918201526057019695505050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000815260008251612b8381601d8501602087016121bc565b91909101601d0192915050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b808201808211156103b9576103b96126d1565b600082612c5757634e487b7160e01b600052601260045260246000fd5b500490565b80820281158282048414176103b9576103b96126d1565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612a4c908301846121e0565b600060208284031215612cb857600080fd5b81516107c881612189565b818103818111156103b9576103b96126d1565b634e487b7160e01b600052603160045260246000fdfe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa26469706673582212208da0e37f5ea53a6f97caed02a54c717ca4353390849b63171570552f232650a764736f6c63430008130033",
  deployedBytecode:
    "0x6080604052600436106102ae5760003560e01c80638f1327c011610175578063c727ed66116100dc578063e386be2e11610095578063f16255341161006f578063f16255341461091a578063f1f666751461093a578063f94726891461095a578063fe81a1f71461099857600080fd5b8063e386be2e146108ba578063e48262f2146108da578063e5df05cf146108fa57600080fd5b8063c727ed66146107e4578063ce45ce0f14610825578063ce6236ca14610838578063cecb2b041461084d578063d547741f1461087a578063db76c7101461089a57600080fd5b8063abb74ba51161012e578063abb74ba514610713578063afba9ada14610733578063b283607b14610771578063b6b55f2514610791578063c0b50cb8146107a4578063c6fd06c7146107c457600080fd5b80638f1327c0146106515780638ff4dd941461067e57806391cb292e1461069e57806391d14854146106be578063a217fddf146106de578063a4e60c0f146106f357600080fd5b80632da32fca1161021957806370480275116101d2578063704802751461058f57806375b238fc146105af57806376c83753146105d15780638120abed146105f15780638c65c81f146106115780638da5cb5b1461063157600080fd5b80632da32fca146104b75780632f2ff15d146104d757806336568abe146104f757806337cae80a1461051757806347ccca021461054f57806358440d7f1461056f57600080fd5b80631785f53c1161026b5780631785f53c146103b65780631bfddd35146103d65780631c9bb65d146103f657806320fb90dd14610424578063248a9ca31461045157806327a1de951461048157600080fd5b806301ffc9a7146102b357806302ed0865146102e857806305499b7a14610315578063101a3cc414610337578063104dbc111461036757806314743e7e14610394575b600080fd5b3480156102bf57600080fd5b506102d36102ce36600461387d565b6109b8565b60405190151581526020015b60405180910390f35b3480156102f457600080fd5b506103086103033660046138bc565b6109ef565b6040516102df919061390a565b34801561032157600080fd5b5061032a610aec565b6040516102df9190613a3d565b34801561034357600080fd5b50610357610352366004613a9f565b610ce0565b6040516102df9493929190613acb565b34801561037357600080fd5b50610387610382366004613b06565b610dbc565b6040516102df9190613b68565b3480156103a057600080fd5b506103b46103af366004613bbd565b610eed565b005b3480156103c257600080fd5b506103b46103d1366004613b06565b611054565b3480156103e257600080fd5b506103b46103f1366004613bd6565b611099565b34801561040257600080fd5b50610416610411366004613bf8565b6113d2565b6040519081526020016102df565b34801561043057600080fd5b5061044461043f366004613a9f565b6114a4565b6040516102df9190613c35565b34801561045d57600080fd5b5061041661046c366004613bbd565b60009081526020819052604090206001015490565b34801561048d57600080fd5b506104a161049c366004613a9f565b6115f8565b6040516102df9a99989796959493929190613c48565b3480156104c357600080fd5b506104166104d23660046138bc565b61177a565b3480156104e357600080fd5b506103b46104f2366004613cc0565b6118d8565b34801561050357600080fd5b506103b4610512366004613cc0565b611902565b34801561052357600080fd5b50610537610532366004613cf0565b611980565b6040516001600160a01b0390911681526020016102df565b34801561055b57600080fd5b50600c54610537906001600160a01b031681565b34801561057b57600080fd5b506103b461058a3660046138bc565b6119c5565b34801561059b57600080fd5b506103b46105aa366004613b06565b611aad565b3480156105bb57600080fd5b506104166000805160206149c283398151915281565b3480156105dd57600080fd5b506104446105ec366004613bd6565b611aef565b3480156105fd57600080fd5b506103b461060c366004613dc8565b611b6e565b34801561061d57600080fd5b506104a161062c366004613bbd565b611cbb565b34801561063d57600080fd5b50600b54610537906001600160a01b031681565b34801561065d57600080fd5b5061067161066c366004613bbd565b611d01565b6040516102df9190613e0f565b34801561068a57600080fd5b50610357610699366004613bd6565b611f30565b3480156106aa57600080fd5b506102d36106b9366004613e22565b611f4c565b3480156106ca57600080fd5b506102d36106d9366004613cc0565b612008565b3480156106ea57600080fd5b50610416600081565b3480156106ff57600080fd5b5061067161070e366004613a9f565b612031565b34801561071f57600080fd5b5061041661072e366004613cf0565b61222b565b34801561073f57600080fd5b5061041661074e366004613cf0565b600760209081526000938452604080852082529284528284209052825290205481565b34801561077d57600080fd5b5061041661078c3660046138bc565b61231c565b6102d361079f366004613bbd565b612409565b3480156107b057600080fd5b506104166107bf366004613a9f565b612597565b3480156107d057600080fd5b506103b46107df366004613bbd565b612612565b3480156107f057600080fd5b506103086107ff366004613cf0565b600660209081526000938452604080852082529284528284209052825290205460ff1681565b6103b4610833366004613a9f565b61291f565b34801561084457600080fd5b50600a54610416565b34801561085957600080fd5b50610416610868366004613b06565b60026020526000908152604090205481565b34801561088657600080fd5b506103b4610895366004613cc0565b612cb8565b3480156108a657600080fd5b506104166108b5366004613bbd565b612cdd565b3480156108c657600080fd5b506102d36108d5366004613b06565b612ce8565b3480156108e657600080fd5b506106716108f5366004613e52565b612d02565b34801561090657600080fd5b50610416610915366004613bbd565b613040565b34801561092657600080fd5b506103b4610935366004613bbd565b613119565b34801561094657600080fd5b506103b46109553660046138bc565b61322d565b34801561096657600080fd5b506104166109753660046138bc565b600860209081526000938452604080852082529284528284209052825290205481565b3480156109a457600080fd5b506104166109b3366004613ec6565b61330e565b60006001600160e01b03198216637965db0b60e01b14806109e957506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000600a54841115610a1c5760405162461bcd60e51b8152600401610a1390613efb565b60405180910390fd5b60008411610a3c5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b0383166000908152600160205260409020548210610a735760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b03831660009081526005602090815260408083208584529091529020548414610ab55760405162461bcd60e51b8152600401610a1390613f90565b506001600160a01b0382166000908152600660209081526040808320848452825280832086845290915290205460ff169392505050565b60606009805480602002602001604051908101604052809291908181526020016000905b82821015610cd75760008481526020908190206040805161014081018252600a86029092018054835260018101546001600160a01b03169383019390935260028301805492939291840191610b6490613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610b9090613fd5565b8015610bdd5780601f10610bb257610100808354040283529160200191610bdd565b820191906000526020600020905b815481529060010190602001808311610bc057829003601f168201915b50505050508152602001600382018054610bf690613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2290613fd5565b8015610c6f5780601f10610c4457610100808354040283529160200191610c6f565b820191906000526020600020905b815481529060010190602001808311610c5257829003601f168201915b505050918352505060048201546001600160a01b0316602080830191909152600583015460408301526006830154606083015260078301546080830152600883015460a083015260099092015460ff16151560c0909101529082526001929092019101610b10565b50505050905090565b60016020528160005260406000208181548110610cfc57600080fd5b60009182526020909120600490910201805460018201546002830180549295506001600160a01b03909116935090610d3390613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d5f90613fd5565b8015610dac5780601f10610d8157610100808354040283529160200191610dac565b820191906000526020600020905b815481529060010190602001808311610d8f57829003601f168201915b5050505050908060030154905084565b6001600160a01b0381166000908152600160209081526040808320805482518185028101850190935280835260609492939192909184015b82821015610ee257600084815260209081902060408051608081018252600486029092018054835260018101546001600160a01b03169383019390935260028301805492939291840191610e4790613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054610e7390613fd5565b8015610ec05780601f10610e9557610100808354040283529160200191610ec0565b820191906000526020600020905b815481529060010190602001808311610ea357829003601f168201915b5050505050815260200160038201548152505081526020019060010190610df4565b505050509050919050565b600b546001600160a01b0316331480610f195750610f196000805160206149c283398151915233612008565b610f355760405162461bcd60e51b8152600401610a1390614009565b600a54811115610f575760405162461bcd60e51b8152600401610a1390613efb565b60008111610f775760405162461bcd60e51b8152600401610a1390613f29565b60006009610f8660018461406a565b81548110610f9657610f9661407d565b60009182526020909120600a90910201600981015490915060ff1615610ffe5760405162461bcd60e51b815260206004820152601760248201527f526f756e6420697320616c7265616479206163746976650000000000000000006044820152606401610a13565b428160070154116110435760405162461bcd60e51b815260206004820152600f60248201526e149bdd5b99081a185cc8195b991959608a1b6044820152606401610a13565b600901805460ff1916600117905550565b600b546001600160a01b0316331461107e5760405162461bcd60e51b8152600401610a1390614093565b6110966000805160206149c283398151915282612cb8565b50565b3360009081526001602052604081208054839081106110ba576110ba61407d565b6000918252602090912060049091020160018101549091506001600160a01b031633146111295760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920617574686f722063616e206170706c7920666f7220726f756e64006044820152606401610a13565b600a5483111561114b5760405162461bcd60e51b8152600401610a1390613efb565b6000831161116b5760405162461bcd60e51b8152600401610a1390613f29565b6000600961117a60018661406a565b8154811061118a5761118a61407d565b60009182526020909120600a90910201600981015490915060ff166111e75760405162461bcd60e51b8152602060048201526013602482015272526f756e64206973206e6f742061637469766560681b6044820152606401610a13565b4281600701541161122c5760405162461bcd60e51b815260206004820152600f60248201526e149bdd5b99081a185cc8195b991959608a1b6044820152606401610a13565b33600090815260016020526040902054831061125a5760405162461bcd60e51b8152600401610a1390613f60565b33600090815260056020908152604080832086845290915290208154815560018083015490820180546001600160a01b0319166001600160a01b039290921691909117905581906002808201906112b39084018261411b565b506003818101906112c69084018261411b565b5060048281015482820180546001600160a01b03199081166001600160a01b03938416179091556005808601549085015560068086015490850155600780860154908501556008808601549085015560099485015494909301805460ff909516151560ff1990951694909417909355600087815260208281526040822080546001818101835591845291909220875491909302909201918255858101549082018054909316931692909217905582906002808201906113879084018261411b565b50600391820154910155604080518481526020810186905233917f811c03f2bbb9360eb64c761297098be1002730230dcb29e79fe32df622aa76f2910160405180910390a250505050565b60008060096113e260018861406a565b815481106113f2576113f261407d565b90600052602060002090600a02019050600061140d87613040565b6001600160a01b038716600090815260076020908152604080832089845282528083208b8452909152812054919250600261144787613439565b61145190846141fc565b61145b91906142f3565b9050600061146a8a8a8a61177a565b905060008483876005015461147f9190614302565b6114899190614319565b9050611495828261406a565b9b9a5050505050505050505050565b6114d860405180608001604052806000815260200160006001600160a01b0316815260200160608152602001600081525090565b6001600160a01b03831660009081526001602052604090208054839081106115025761150261407d565b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200160028201805461156490613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461159090613fd5565b80156115dd5780601f106115b2576101008083540402835291602001916115dd565b820191906000526020600020905b8154815290600101906020018083116115c057829003601f168201915b50505050508152602001600382015481525050905092915050565b600560209081526000928352604080842090915290825290208054600182015460028301805492936001600160a01b039092169261163590613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461166190613fd5565b80156116ae5780601f10611683576101008083540402835291602001916116ae565b820191906000526020600020905b81548152906001019060200180831161169157829003601f168201915b5050505050908060030180546116c390613fd5565b80601f01602080910402602001604051908101604052809291908181526020018280546116ef90613fd5565b801561173c5780601f106117115761010080835404028352916020019161173c565b820191906000526020600020905b81548152906001019060200180831161171f57829003601f168201915b5050506004840154600585015460068601546007870154600888015460099098015496976001600160a01b0390941696929550909350919060ff168a565b6000600a5484111561179e5760405162461bcd60e51b8152600401610a1390613efb565b600084116117be5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03831660009081526001602052604090205482106117f55760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038316600090815260056020908152604080832085845290915290205484146118375760405162461bcd60e51b8152600401610a1390613f90565b600061184285613040565b6001600160a01b038516600090815260076020908152604080832087845282528083208984529091528120549192509061187e906002906142f3565b90506000600961188f60018961406a565b8154811061189f5761189f61407d565b90600052602060002090600a020190506000838383600501546118c29190614302565b6118cc9190614319565b98975050505050505050565b6000828152602081905260409020600101546118f381613492565b6118fd838361349c565b505050565b6001600160a01b03811633146119725760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610a13565b61197c8282613520565b5050565b600360205282600052604060002060205281600052604060002081815481106119a857600080fd5b6000918252602090912001546001600160a01b0316925083915050565b600b546001600160a01b03163314806119f157506119f16000805160206149c283398151915233612008565b611a0d5760405162461bcd60e51b8152600401610a1390614009565b6001600160a01b0382166000908152600660209081526040808320848452825280832086845290915281205460ff166002811115611a4d57611a4d6138f4565b14611a6a5760405162461bcd60e51b8152600401610a139061433b565b6001600160a01b03821660009081526006602090815260408083208484528252808320868452909152902080546002919060ff19166001835b0217905550505050565b600b546001600160a01b03163314611ad75760405162461bcd60e51b8152600401610a1390614093565b6110966000805160206149c283398151915282613585565b611b2360405180608001604052806000815260200160006001600160a01b0316815260200160608152602001600081525090565b600083815260046020526040902054611b4e5760405162461bcd60e51b8152600401610a139061437c565b60008381526004602052604090208054839081106115025761150261407d565b336000908152600160205260409020805483908110611b8f57611b8f61407d565b60009182526020909120600490910201600101546001600160a01b03163314611bfa5760405162461bcd60e51b815260206004820152601e60248201527f4f6e6c7920617574686f722063616e207570646174652061727469636c6500006044820152606401610a13565b6000815111611c455760405162461bcd60e51b8152602060048201526017602482015276436f6e74656e742063616e6e6f7420626520656d70747960481b6044820152606401610a13565b336000908152600160205260409020548210611c735760405162461bcd60e51b8152600401610a1390613f60565b336000908152600160205260408120805484908110611c9457611c9461407d565b9060005260206000209060040201905081816002019081611cb591906143aa565b50505050565b60098181548110611ccb57600080fd5b60009182526020909120600a90910201805460018201546002830180549294506001600160a01b03909116929161163590613fd5565b611d09613809565b600a54821115611d2b5760405162461bcd60e51b8152600401610a1390613efb565b60008211611d4b5760405162461bcd60e51b8152600401610a1390613f29565b6009611d5860018461406a565b81548110611d6857611d6861407d565b90600052602060002090600a020160405180610140016040529081600082015481526020016001820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b03168152602001600282018054611dcb90613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054611df790613fd5565b8015611e445780601f10611e1957610100808354040283529160200191611e44565b820191906000526020600020905b815481529060010190602001808311611e2757829003601f168201915b50505050508152602001600382018054611e5d90613fd5565b80601f0160208091040260200160405190810160405280929190818152602001828054611e8990613fd5565b8015611ed65780601f10611eab57610100808354040283529160200191611ed6565b820191906000526020600020905b815481529060010190602001808311611eb957829003601f168201915b505050918352505060048201546001600160a01b03166020820152600582015460408201526006820154606082015260078201546080820152600882015460a082015260099091015460ff16151560c09091015292915050565b60046020528160005260406000208181548110610cfc57600080fd5b6001600160a01b0382166000908152600160205260408120548210611f835760405162461bcd60e51b8152600401610a1390613f60565b600c546040516348e5949760e11b81526001600160a01b038681166004830152858116602483015260448201859052909116906391cb292e90606401602060405180830381865afa158015611fdc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120009190614464565b949350505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b612039613809565b6001600160a01b03831660009081526001602052604090205482106120705760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b0380841660009081526005602090815260408083208684528252918290208251610140810184528154815260018201549094169184019190915260028101805491928401916120c590613fd5565b80601f01602080910402602001604051908101604052809291908181526020018280546120f190613fd5565b801561213e5780601f106121135761010080835404028352916020019161213e565b820191906000526020600020905b81548152906001019060200180831161212157829003601f168201915b5050505050815260200160038201805461215790613fd5565b80601f016020809104026020016040519081016040528092919081815260200182805461218390613fd5565b80156121d05780601f106121a5576101008083540402835291602001916121d0565b820191906000526020600020905b8154815290600101906020018083116121b357829003601f168201915b505050918352505060048201546001600160a01b03166020820152600582015460408201526006820154606082015260078201546080820152600882015460a082015260099091015460ff16151560c0909101529392505050565b6000600a5482111561224f5760405162461bcd60e51b8152600401610a1390613efb565b6000821161226f5760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03841660009081526001602052604090205483106122a65760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038416600090815260056020908152604080832086845290915290205482146122e85760405162461bcd60e51b8152600401610a1390613f90565b506001600160a01b038316600090815260076020908152604080832085845282528083208484529091529020549392505050565b6000600a548411156123405760405162461bcd60e51b8152600401610a1390613efb565b600084116123605760405162461bcd60e51b8152600401610a1390613f29565b6001600160a01b03831660009081526001602052604090205482106123975760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b038316600090815260056020908152604080832085845290915290205484146123d95760405162461bcd60e51b8152600401610a1390613f90565b5060009283526008602090815260408085206001600160a01b039490941685529281528284209184525290205490565b6000600a5482111561242d5760405162461bcd60e51b8152600401610a1390613efb565b6000821161244d5760405162461bcd60e51b8152600401610a1390613f29565b343331101561249e5760405162461bcd60e51b815260206004820152601d60248201527f4e6f7420656e6f7567682062616c616e636520746f206465706f7369740000006044820152606401610a13565b600060096124ad60018561406a565b815481106124bd576124bd61407d565b600091825260208220600a919091020160048101546040519193506001600160a01b03169190829034908381818185875af1925050503d806000811461251f576040519150601f19603f3d011682016040523d82523d6000602084013e612524565b606091505b50509050806125755760405162461bcd60e51b815260206004820152601760248201527f4661696c656420746f206465706f7369742045746865720000000000000000006044820152606401610a13565b3483600501600082825461258991906141fc565b909155509095945050505050565b6001600160a01b03821660009081526001602052604081205482106125ce5760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b03831660009081526001602052604090208054839081106125f8576125f861407d565b906000526020600020906004020160030154905092915050565b600b546001600160a01b031633148061263e575061263e6000805160206149c283398151915233612008565b61265a5760405162461bcd60e51b8152600401610a1390614009565b600a5481111561267c5760405162461bcd60e51b8152600401610a1390613efb565b6000811161269c5760405162461bcd60e51b8152600401610a1390613f29565b600060096126ab60018461406a565b815481106126bb576126bb61407d565b90600052602060002090600a0201905060006126d683613040565b6000848152600460205260409020549091506127045760405162461bcd60e51b8152600401610a139061437c565b60005b600084815260046020526040902054811015611cb557600084815260046020526040812080548390811061273d5761273d61407d565b600091825260208083206001600490930201918201546001600160a01b03168352600781526040808420835485528252808420898552909152822054909250612788906002906142f3565b905060008482876005015461279d9190614302565b6127a79190614319565b600088815260086020908152604080832060018801546001600160a01b031684528252808320875484529091529020819055905080156129095760048681015460018501546040516330cb4c5b60e21b81526001600160a01b03918216938101939093526024830184905260009291169063c32d316c906044016020604051808303816000875af1158015612840573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128649190614464565b9050806128b35760405162461bcd60e51b815260206004820152601a60248201527f416c6c6f636174696f6e207472616e73666572206661696c65640000000000006044820152606401610a13565b60018401548454604080516001600160a01b0390931683526020830191909152810183905288907f0ce65a112a335d2d5fc972d2f7d916ac65b9c552cca921234bb7846404f7cf179060600160405180910390a2505b505050808061291790614486565b915050612707565b6001600160a01b03821633036129775760405162461bcd60e51b815260206004820152601c60248201527f617574686f722063616e6e6f7420646f6e61746520746f2073656c66000000006044820152606401610a13565b66038d7ea4c6800034116129e25760405162461bcd60e51b815260206004820152602c60248201527f646f6e6174696f6e206d7573742062652067726561746572207468616e206d6960448201526b1b9a5b5d5b48185b5bdd5b9d60a21b6064820152608401610a13565b6001600160a01b0382166000908152600160205260409020548110612a195760405162461bcd60e51b8152600401610a1390613f60565b6001600160a01b0382166000908152600160205260408120805483908110612a4357612a4361407d565b906000526020600020906004020190506000836001600160a01b03163460405160006040518083038185875af1925050503d8060008114612aa0576040519150601f19603f3d011682016040523d82523d6000602084013e612aa5565b606091505b5050905080612aef5760405162461bcd60e51b81526020600482015260166024820152752330b4b632b2103a37903237b730ba329022ba3432b960511b6044820152606401610a13565b6001600160a01b03841660009081526003602081815260408084208785528252832080546001810182559084529083200180546001600160a01b0319163317905583018054349290612b429084906141fc565b90915550506001600160a01b03841660009081526002602052604081208054349290612b6f9084906141fc565b90915550506001600160a01b03841660009081526005602090815260408083208684529091529020600981015460ff1615612bef57612bad34613439565b6001600160a01b038616600090815260076020908152604080832088845282528083208554845290915281208054909190612be99084906141fc565b90915550505b6040805185815234602082015233916001600160a01b038816917f156f4e4409ddebc945c5614a72c50315673686ffb291cac167b0409de20f291b910160405180910390a3600c5460405163b85cbc7960e01b81526001600160a01b039091169063b85cbc7990612c6d9033908990899060028a019060040161449f565b6020604051808303816000875af1158015612c8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cb09190614550565b505050505050565b600082815260208190526040902060010154612cd381613492565b6118fd8383613520565b60006109e982613439565b60006109e96000805160206149c283398151915283612008565b612d0a613809565b600b546001600160a01b0316331480612d365750612d366000805160206149c283398151915233612008565b612d525760405162461bcd60e51b8152600401610a1390614009565b818310612dac5760405162461bcd60e51b815260206004820152602260248201527f53746172742064617465206d757374206265206265666f726520656e64206461604482015261746560f01b6064820152608401610a13565b428211612dfb5760405162461bcd60e51b815260206004820152601e60248201527f456e642064617465206d75737420626520696e207468652066757475726500006044820152606401610a13565b6000612e0886858561358f565b9050600085604051602001612e1d9190614569565b60405160208183030381529060405290506000604051806101400160405280600a546001612e4b91906141fc565b8152600b546001600160a01b0390811660208084019190915260408084018d9052606084018790528783166080850152600060a0850181905260c085018c905260e085018b90524261010086015261012090940184905260098054600181018255945284517f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af600a909502948501908155918501517f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7b0850180546001600160a01b031916919094161790925590830151929350839290917f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7b10190612f4f90826143aa565b5060608201516003820190612f6490826143aa565b5060808201516004820180546001600160a01b0319166001600160a01b0390921691909117905560a0820151600582015560c0820151600682015560e082015160078201556101008201516008820155610120909101516009909101805460ff1916911515919091179055600a5433907f54f1e700602fe6f1e920566675fa34d9f2ce7d06894c9369be2e0fecd1ca40359085906130039060016141fc565b8b8a8a604051613017959493929190614585565b60405180910390a2600a805490600061302f83614486565b909155509098975050505050505050565b600080805b600084815260046020526040902054811015613112576000848152600460205260409020546130865760405162461bcd60e51b8152600401610a139061437c565b60008481526004602052604081208054839081106130a6576130a661407d565b600091825260208083206001600490930201918201546001600160a01b03168352600781526040808420835485528252808420898552909152909120549091506130f16002826142f3565b6130fb90856141fc565b93505050808061310a90614486565b915050613045565b5092915050565b600b546001600160a01b031633148061314557506131456000805160206149c283398151915233612008565b6131615760405162461bcd60e51b8152600401610a1390614009565b600a548111156131835760405162461bcd60e51b8152600401610a1390613efb565b600081116131a35760405162461bcd60e51b8152600401610a1390613f29565b600060096131b260018461406a565b815481106131c2576131c261407d565b60009182526020909120600a90910201600981015490915060ff1661321f5760405162461bcd60e51b8152602060048201526013602482015272526f756e64206973206e6f742061637469766560681b6044820152606401610a13565b600901805460ff1916905550565b600b546001600160a01b031633148061325957506132596000805160206149c283398151915233612008565b6132755760405162461bcd60e51b8152600401610a1390614009565b6001600160a01b0382166000908152600660209081526040808320848452825280832086845290915281205460ff1660028111156132b5576132b56138f4565b146132d25760405162461bcd60e51b8152600401610a139061433b565b6001600160a01b03821660009081526006602090815260408083208484528252808320868452909152902080546001919060ff19168280611aa3565b60008082511161335a5760405162461bcd60e51b8152602060048201526017602482015276436f6e74656e742063616e6e6f7420626520656d70747960481b6044820152606401610a13565b3360008181526001602081815260408084208054825160808101845281815280850197885292830189815260608401879052858552818601835591865292909420815160048402909101908155945192850180546001600160a01b0319166001600160a01b039094169390931790925591519192909182919060028201906133e290826143aa565b50606082015181600301555050336001600160a01b03167f8287f7cb9ee4a80a03db149d7cce31b9dc4803c6746c41e6131a5da3fbe392fa858460405161342a9291906145c0565b60405180910390a25092915050565b60008060026134498460016141fc565b6134539190614319565b90508291505b8181101561348c579050806002816134718186614319565b61347b91906141fc565b6134859190614319565b9050613459565b50919050565b61109681336135fb565b6134a68282612008565b61197c576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556134dc3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61352a8282612008565b1561197c576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b61197c828261349c565b600080604051806020016135a290613870565b6020820181038252601f19601f82011660405250905060008585856040516020016135cf939291906145e2565b604051602081830303815290604052805190602001209050808251602084016000f59695505050505050565b6136058282612008565b61197c5761361281613654565b61361d836020613666565b60405160200161362e929190614609565b60408051601f198184030181529082905262461bcd60e51b8252610a139160040161467e565b60606109e96001600160a01b03831660145b60606000613675836002614302565b6136809060026141fc565b67ffffffffffffffff81111561369857613698613d25565b6040519080825280601f01601f1916602001820160405280156136c2576020820181803683370190505b509050600360fc1b816000815181106136dd576136dd61407d565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061370c5761370c61407d565b60200101906001600160f81b031916908160001a9053506000613730846002614302565b61373b9060016141fc565b90505b60018111156137b3576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061376f5761376f61407d565b1a60f81b8282815181106137855761378561407d565b60200101906001600160f81b031916908160001a90535060049490941c936137ac81614691565b905061373e565b5083156138025760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610a13565b9392505050565b6040518061014001604052806000815260200160006001600160a01b03168152602001606081526020016060815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000151581525090565b610319806146a983390190565b60006020828403121561388f57600080fd5b81356001600160e01b03198116811461380257600080fd5b6001600160a01b038116811461109657600080fd5b6000806000606084860312156138d157600080fd5b8335925060208401356138e3816138a7565b929592945050506040919091013590565b634e487b7160e01b600052602160045260246000fd5b602081016003831061392c57634e487b7160e01b600052602160045260246000fd5b91905290565b60005b8381101561394d578181015183820152602001613935565b50506000910152565b6000815180845261396e816020860160208601613932565b601f01601f19169290920160200192915050565b60006101408251845260208301516139a560208601826001600160a01b03169052565b5060408301518160408601526139bd82860182613956565b915050606083015184820360608601526139d78282613956565b91505060808301516139f460808601826001600160a01b03169052565b5060a083015160a085015260c083015160c085015260e083015160e085015261010080840151818601525061012080840151613a338287018215159052565b5090949350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015613a9257603f19888603018452613a80858351613982565b94509285019290850190600101613a64565b5092979650505050505050565b60008060408385031215613ab257600080fd5b8235613abd816138a7565b946020939093013593505050565b8481526001600160a01b0384166020820152608060408201819052600090613af590830185613956565b905082606083015295945050505050565b600060208284031215613b1857600080fd5b8135613802816138a7565b8051825260018060a01b0360208201511660208301526000604082015160806040850152613b546080850182613956565b606093840151949093019390935250919050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015613a9257603f19888603018452613bab858351613b23565b94509285019290850190600101613b8f565b600060208284031215613bcf57600080fd5b5035919050565b60008060408385031215613be957600080fd5b50508035926020909101359150565b60008060008060808587031215613c0e57600080fd5b843593506020850135613c20816138a7565b93969395505050506040820135916060013590565b6020815260006138026020830184613b23565b8a81526001600160a01b038a8116602083015261014060408301819052600091613c748483018d613956565b91508382036060850152613c88828c613956565b99166080840152505060a081019590955260c085019390935260e0840191909152610100830152151561012090910152949350505050565b60008060408385031215613cd357600080fd5b823591506020830135613ce5816138a7565b809150509250929050565b600080600060608486031215613d0557600080fd5b8335613d10816138a7565b95602085013595506040909401359392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112613d4c57600080fd5b813567ffffffffffffffff80821115613d6757613d67613d25565b604051601f8301601f19908116603f01168101908282118183101715613d8f57613d8f613d25565b81604052838152866020858801011115613da857600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215613ddb57600080fd5b82359150602083013567ffffffffffffffff811115613df957600080fd5b613e0585828601613d3b565b9150509250929050565b6020815260006138026020830184613982565b600080600060608486031215613e3757600080fd5b8335613e42816138a7565b925060208401356138e3816138a7565b60008060008060808587031215613e6857600080fd5b843567ffffffffffffffff80821115613e8057600080fd5b613e8c88838901613d3b565b95506020870135915080821115613ea257600080fd5b50613eaf87828801613d3b565b949794965050505060408301359260600135919050565b600060208284031215613ed857600080fd5b813567ffffffffffffffff811115613eef57600080fd5b61200084828501613d3b565b602080825260149082015273149bdd5b9908191bd95cc81b9bdd08195e1a5cdd60621b604082015260600190565b60208082526018908201527f526f756e644964203020646f6573206e6f742065786973740000000000000000604082015260600190565b602080825260169082015275105c9d1a58db1948191bd95cc81b9bdd08195e1a5cdd60521b604082015260600190565b60208082526025908201527f417574686f7220686173206e6f74206170706c69656420666f722074686973206040820152641c9bdd5b9960da1b606082015260800190565b600181811c90821680613fe957607f821691505b60208210810361348c57634e487b7160e01b600052602260045260246000fd5b6020808252602b908201527f4f6e6c79206f776e6572206f722061646d696e2063616e2063616c6c2074686960408201526a3990333ab731ba34b7b71760a91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b818103818111156109e9576109e9614054565b634e487b7160e01b600052603260045260246000fd5b60208082526022908201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f604082015261371760f11b606082015260800190565b601f8211156118fd57600081815260208120601f850160051c810160208610156140fc5750805b601f850160051c820191505b81811015612cb057828155600101614108565b818103614126575050565b6141308254613fd5565b67ffffffffffffffff81111561414857614148613d25565b61415c816141568454613fd5565b846140d5565b6000601f82116001811461419057600083156141785750848201545b600019600385901b1c1916600184901b1784556141f5565b600085815260209020601f19841690600086815260209020845b838110156141ca57828601548255600195860195909101906020016141aa565b50858310156141e85781850154600019600388901b60f8161c191681555b50505060018360011b0184555b5050505050565b808201808211156109e9576109e9614054565b600181815b8085111561424a57816000190482111561423057614230614054565b8085161561423d57918102915b93841c9390800290614214565b509250929050565b600082614261575060016109e9565b8161426e575060006109e9565b8160018114614284576002811461428e576142aa565b60019150506109e9565b60ff84111561429f5761429f614054565b50506001821b6109e9565b5060208310610133831016604e8410600b84101617156142cd575081810a6109e9565b6142d7838361420f565b80600019048211156142eb576142eb614054565b029392505050565b600061380260ff841683614252565b80820281158282048414176109e9576109e9614054565b60008261433657634e487b7160e01b600052601260045260246000fd5b500490565b60208082526021908201527f4170706c69636174696f6e20737461747573206973206e6f742050656e64696e6040820152606760f81b606082015260800190565b602080825260149082015273139bc8185c9d1a58db195cc81a5b881c9bdd5b9960621b604082015260600190565b815167ffffffffffffffff8111156143c4576143c4613d25565b6143d2816141568454613fd5565b602080601f83116001811461440757600084156143ef5750858301515b600019600386901b1c1916600185901b178555612cb0565b600085815260208120601f198616915b8281101561443657888601518255948401946001909101908401614417565b50858210156144545787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561447657600080fd5b8151801515811461380257600080fd5b60006001820161449857614498614054565b5060010190565b6001600160a01b03858116825284166020808301919091526040820184905260806060830152825460009182916144d581613fd5565b80608087015260a06001808416600081146144f757600181146145115761453f565b60ff1985168984015283151560051b89018301965061453f565b896000528560002060005b858110156145375781548b820186015290830190870161451c565b8a0184019750505b50949b9a5050505050505050505050565b60006020828403121561456257600080fd5b5051919050565b6000825161457b818460208701613932565b9190910192915050565b60018060a01b038616815284602082015260a0604082015260006145ac60a0830186613956565b606083019490945250608001529392505050565b6040815260006145d36040830185613956565b90508260208301529392505050565b600084516145f4818460208901613932565b91909101928352506020820152604001919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614641816017850160208801613932565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351614672816028840160208801613932565b01602801949350505050565b6020815260006138026020830184613956565b6000816146a0576146a0614054565b50600019019056fe608060405234801561001057600080fd5b50600080546001600160a01b031916331790556102e7806100326000396000f3fe6080604052600436106100385760003560e01c806312065fe0146100445780638da5cb5b14610064578063c32d316c1461009c57600080fd5b3661003f57005b600080fd5b34801561005057600080fd5b506040514781526020015b60405180910390f35b34801561007057600080fd5b50600054610084906001600160a01b031681565b6040516001600160a01b03909116815260200161005b565b3480156100a857600080fd5b506100bc6100b7366004610279565b6100cc565b604051901515815260200161005b565b600080546001600160a01b031633146101375760405162461bcd60e51b815260206004820152602260248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f604482015261371760f11b60648201526084015b60405180910390fd5b814710156101875760405162461bcd60e51b815260206004820152601760248201527f4e6f7420656e6f75676820706f6f6c2062616c616e6365000000000000000000604482015260640161012e565b6001600160a01b0383166101cf5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b604482015260640161012e565b6000836001600160a01b03168360405160006040518083038185875af1925050503d806000811461021c576040519150601f19603f3d011682016040523d82523d6000602084013e610221565b606091505b50509050806102725760405162461bcd60e51b815260206004820152601760248201527f4661696c656420746f20706f6f6c207472616e73666572000000000000000000604482015260640161012e565b9392505050565b6000806040838503121561028c57600080fd5b82356001600160a01b03811681146102a357600080fd5b94602093909301359350505056fea2646970667358221220997bda3b53bd32a43443b84bc3a733dc1a90bfd33c310c694bef522349c9eba164736f6c63430008130033a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a2646970667358221220b87a4347c87be94ee0c8f9737649eaa5af2e5a6a634eba4798a69e351b7b72fa64736f6c63430008130033",
  linkReferences: {},
  deployedLinkReferences: {},
};
