// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {PoolContract} from "./PoolContract.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO: add on-chain verification of Gitcoin passport with EAS Attestation
// schema UID(OP): 0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89
// https://docs.passport.gitcoin.co/building-with-passport/contract-reference

contract ArticlePlatform {
    struct Article {
        uint256 id;
        address payable author;
        string content; // IPFS hash
        uint256 donationsReceived;
    }
    struct Round {
        uint256 id;
        address owner;
        address poolAddress;
        uint256 poolAmount;
        uint256 startDate;
        uint256 endDate;
        uint256 createdTimestamp;
        bool isActive;
    }
    // author => articles
    mapping(address => Article[]) public authorArticles;
    // author => totalDonations
    mapping(address => uint256) public authorTotalDonations;
    // author => articleId => donators
    mapping(address => mapping(uint256 => address[])) public articleDonators;
    // array of rounds
    Round[] public rounds;
    // Round.id => Article[]
    mapping(uint256 => Article[]) public roundArticles;
    // author => Article.id => Round
    mapping(address => mapping(uint256 => Round))
        public authorToArticleIdToRound;
    // author => Article.id => Round.id => uint256
    mapping(address => mapping(uint256 => mapping(uint256 => uint256)))
        public recievedDonationsWithinRound;
    // TODO: add support for multiple tokens
    // Token addresses(temp)
    // address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    // address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    event ArticlePosted(
        address indexed author,
        string content,
        uint256 articleId
    );
    event ArticleDonated(
        address indexed author,
        address from,
        uint256 articleId,
        uint256 amount
    );
    event RoundCreated(
        address indexed owner,
        address poolAddress,
        uint256 startDate,
        uint256 endDate
    );

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function postArticle(string memory _content) public returns (uint256) {
        Article memory newArticle = Article({
            id: authorArticles[msg.sender].length - 1,
            author: payable(msg.sender),
            content: _content,
            donationsReceived: 0
        });

        authorArticles[msg.sender].push(newArticle);
        uint256 articleId = authorArticles[msg.sender].length - 1;

        emit ArticlePosted(msg.sender, _content, articleId);

        return articleId;
    }

    function donateToArticle(
        address _author,
        uint256 _articleId,
        IERC20 _token,
        uint256 _amount
    ) external {
        // TODO: Add support for multiple tokens
        // require(
        //     address(_token) == DAI || address(_token) == USDC,
        //     "Token not supported"
        // );

        // check if amount of token is approved for this contract
        require(
            IERC20(address(_token)).allowance(msg.sender, address(this)) >=
                _amount,
            "Not enough allowance"
        );
        require(
            IERC20(address(_token)).balanceOf(msg.sender) >= _amount,
            "Not enough balance"
        );
        require(_amount > 0, "Amount must be greater than 0");
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        Article storage article = authorArticles[_author][_articleId];
        // Transfer tokens from the sender to the author
        IERC20(address(_token)).transferFrom(
            msg.sender,
            article.author,
            _amount
        );
        // Add donator to the list
        articleDonators[_author][_articleId].push(msg.sender);
        // Update donation amounts
        article.donationsReceived += _amount;
        authorTotalDonations[_author] += _amount;

        // check if author has applied for round
        // if yes, add amount
        Round storage round = authorToArticleIdToRound[_author][_articleId];
        if (round.id >= 0 && round.isActive) {
            recievedDonationsWithinRound[_author][_articleId][
                round.id
            ] += _amount;
        }
        emit ArticleDonated(_author, msg.sender, _articleId, _amount);
    }

    function applyForRound(uint256 _roundId, uint256 _articleId) external {
        Article storage article = authorArticles[msg.sender][_articleId];
        require(
            msg.sender == article.author,
            "Only author can apply for round"
        );
        require(_roundId < rounds.length, "Round does not exist");
        Round storage round = rounds[_roundId];
        require(round.isActive, "Round is not active");
        require(round.endDate > block.timestamp, "Round has ended");
        require(
            _articleId < authorArticles[msg.sender].length,
            "Article does not exist"
        );
        authorToArticleIdToRound[msg.sender][_articleId] = round;
    }

    function _createPool(
        IERC20 _token,
        string memory _name,
        uint256 _startDate,
        uint256 _endDate
    ) internal returns (address poolAddress) {
        bytes memory bytecode = type(PoolContract).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_name, _startDate, _endDate));
        assembly {
            poolAddress := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        PoolContract(poolAddress).initialize(IERC20(address(_token)));
        return poolAddress;
    }

    function createRound(
        IERC20 _token,
        string memory _name,
        uint256 _startDate,
        uint256 _endDate
    ) external onlyOwner returns (Round memory) {
        // require(_startDate < _endDate, "Start date must be before end date");
        // require(
        //     _startDate > block.timestamp,
        //     "Start date must be in the future"
        // );
        // require(_endDate > block.timestamp, "End date must be in the future");

        address pool = _createPool(_token, _name, _startDate, _endDate);
        Round memory newRound = Round({
            id: rounds.length,
            owner: owner,
            poolAddress: pool,
            poolAmount: 0,
            startDate: _startDate,
            endDate: _endDate,
            createdTimestamp: block.timestamp,
            isActive: true
        });
        emit RoundCreated(msg.sender, pool, _startDate, _endDate);
        rounds.push(newRound);
        return newRound;
    }

    function getAuthorArticle(
        address _author,
        uint256 _articleId
    ) public view returns (string memory) {
        return authorArticles[_author][_articleId].content;
    }

    function getRoundArticle(
        uint256 _roundId,
        uint256 _articleId
    ) public view returns (Article memory) {
        return roundArticles[_roundId][_articleId];
    }

    function getRound(uint256 _roundId) public view returns (Round memory) {
        return rounds[_roundId];
    }
}
