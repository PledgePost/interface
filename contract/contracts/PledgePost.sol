// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {PoolContract} from "./PoolContract.sol";
import {IPoolContract} from "./interface/IPoolContract.sol";
import {QF} from "./libraries/QF.sol";
import {IPledgePostERC721} from "./interface/IPledgePostERC721.sol";
import {PledgePostERC721} from "./PledgePostERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO: add on-chain verification of Gitcoin passport with EAS Attestation
// schema UID(OP): 0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89
// https://docs.passport.gitcoin.co/building-with-passport/contract-reference
contract PledgePost {
    struct Article {
        uint256 id;
        address author;
        string content; // IPFS hash
        uint256 donationsReceived;
    }
    struct Round {
        uint256 id;
        address owner;
        string name;
        bytes description;
        address poolAddress;
        IERC20 poolToken;
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
    // Round.id => Article[]
    mapping(uint256 => Article[]) public roundArticles;
    // author => Article.id => Round
    mapping(address => mapping(uint256 => Round))
        public authorToArticleIdToRound;

    enum ApplicationStatus {
        Pending,
        Accepted,
        Denied
    }
    // author => Article.id => Round.id => ApplicationStatus
    mapping(address => mapping(uint256 => mapping(uint256 => ApplicationStatus)))
        public applicationStatusForRound;

    // author => Article.id => Round.id => uint256
    mapping(address => mapping(uint256 => mapping(uint256 => uint256)))
        public recievedDonationsWithinRound;

    // round.id => author => article.id => amount
    mapping(uint256 => mapping(address => mapping(uint256 => uint256)))
        public matchingAmounts;
    // array of rounds
    Round[] public rounds;
    uint256 roundLength = 1;

    // TODO: initialize token
    event ArticlePosted(
        address indexed author,
        string content,
        uint256 articleId
    );
    event ArticleDonated(
        address indexed author,
        address indexed from,
        uint256 articleId,
        uint256 amount
    );

    event RoundCreated(
        address indexed owner,
        address ipoolAddress,
        uint256 roundId,
        string name,
        uint256 startDate,
        uint256 endDate
    );
    event RoundApplied(
        address indexed author,
        uint256 articleId,
        uint256 roundId
    );
    event Allocated(uint256 indexed roundId, address recipient, uint256 amount);

    address public owner;
    IPledgePostERC721 public nft;

    // IERC20 public token;

    constructor() {
        owner = msg.sender;
        // TODO: change token URI
        nft = new PledgePostERC721(
            address(this),
            "https://bafybeiev4tgktvtgo5hjmfukj5p76iw5uyh3bisu7ivk6s4n7mfyrqmvf4.ipfs.dweb.link"
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function postArticle(string memory _content) public returns (uint256) {
        require(bytes(_content).length > 0, "Content cannot be empty");
        uint articleId = authorArticles[msg.sender].length;
        Article memory newArticle = Article({
            id: articleId,
            author: msg.sender,
            content: _content,
            donationsReceived: 0
        });

        authorArticles[msg.sender].push(newArticle);

        emit ArticlePosted(msg.sender, _content, articleId);

        return articleId;
    }

    function donateToArticle(
        address _author,
        uint256 _articleId,
        IERC20 _token,
        uint256 _amount
    ) external {
        // require(_token == token, "Token not supported");

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
            recievedDonationsWithinRound[_author][_articleId][round.id] += QF
                .sqrt(_amount);
        }
        emit ArticleDonated(_author, msg.sender, _articleId, _amount);
        nft.mint(msg.sender, _author, _articleId, article.content);
    }

    function applyForRound(uint256 _roundId, uint256 _articleId) external {
        Article storage article = authorArticles[msg.sender][_articleId];
        require(
            msg.sender == article.author,
            "Only author can apply for round"
        );
        require(_roundId < roundLength, "Round does not exist");
        Round storage round = rounds[_roundId];
        require(round.isActive, "Round is not active");
        require(round.endDate > block.timestamp, "Round has ended");
        require(
            _articleId < authorArticles[msg.sender].length,
            "Article does not exist"
        );
        authorToArticleIdToRound[msg.sender][_articleId] = round;
        roundArticles[_roundId].push(article);

        emit RoundApplied(msg.sender, _articleId, _roundId);
    }

    // TODO: control status when donated
    function acceptApplication(
        uint256 _roundId,
        address _author,
        uint256 _articleId
    ) external onlyOwner {
        require(
            applicationStatusForRound[_author][_articleId][_roundId] ==
                ApplicationStatus.Pending,
            "Application status is not Pending"
        );
        applicationStatusForRound[_author][_articleId][
            _roundId
        ] = ApplicationStatus.Accepted;
    }

    function denyApplication(
        uint256 _roundId,
        address _author,
        uint256 _articleId
    ) external onlyOwner {
        require(
            applicationStatusForRound[_author][_articleId][_roundId] ==
                ApplicationStatus.Pending,
            "Application status is not Pending"
        );
        applicationStatusForRound[_author][_articleId][
            _roundId
        ] = ApplicationStatus.Denied;
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
        string memory _description,
        uint256 _startDate,
        uint256 _endDate
    ) external onlyOwner returns (Round memory) {
        require(_startDate < _endDate, "Start date must be before end date");
        // require(
        //     _startDate > block.timestamp,
        //     "Start date must be in the future"
        // );
        require(_endDate > block.timestamp, "End date must be in the future");

        address pool = _createPool(_token, _name, _startDate, _endDate);
        bytes memory description = abi.encodePacked(_description);

        Round memory newRound = Round({
            id: roundLength,
            owner: owner,
            name: _name,
            description: description,
            poolAddress: pool,
            poolToken: _token,
            poolAmount: 0,
            startDate: _startDate,
            endDate: _endDate,
            createdTimestamp: block.timestamp,
            isActive: false
        });
        emit RoundCreated(
            msg.sender,
            pool,
            roundLength,
            _name,
            _startDate,
            _endDate
        );
        rounds.push(newRound);
        roundLength++;
        return newRound;
    }

    function activateRound(uint256 _roundId) external onlyOwner {
        require(_roundId < roundLength, "Round does not exist");
        Round storage round = rounds[_roundId];
        require(!round.isActive, "Round is already active");
        require(round.endDate > block.timestamp, "Round has ended");
        round.isActive = true;
    }

    function deactivateRound(uint256 _roundId) external onlyOwner {
        require(_roundId < roundLength, "Round does not exist");
        Round storage round = rounds[_roundId];
        require(round.isActive, "Round is not active");
        round.isActive = false;
    }

    function Allocate(uint256 _roundId) external onlyOwner {
        require(_roundId < roundLength, "Round does not exist");
        Round storage round = rounds[_roundId];
        uint256 totalSquareSqrtSum = 0;
        // calculate totalSquareSqrtSum
        totalSquareSqrtSum = getTotalSquareSqrtSum(_roundId);
        // calculate matching for each article
        require(roundArticles[_roundId].length > 0, "No articles in round");
        for (uint256 i = 0; i < roundArticles[_roundId].length; i++) {
            Article storage article = roundArticles[_roundId][i];
            uint256 suquareSqrtSum = recievedDonationsWithinRound[
                article.author
            ][article.id][_roundId] ** 2;
            uint256 matching = (round.poolAmount * suquareSqrtSum) /
                totalSquareSqrtSum;
            matchingAmounts[_roundId][article.author][article.id] = matching;
            // transfer matching to author address
            IPoolContract(round.poolAddress).poolTransfer(
                article.author,
                matching
            );
            emit Allocated(_roundId, article.author, matching);
        }
    }

    // TODO: add access control
    function deposit(
        uint256 _roundId,
        uint256 _amount
    ) external returns (bool success) {
        require(_roundId < roundLength, "Round does not exist");
        Round storage round = rounds[_roundId];
        success = IERC20(address(round.poolToken)).transferFrom(
            msg.sender,
            round.poolAddress,
            _amount
        );
        round.poolAmount += _amount;
        return success;
    }

    function getTotalSquareSqrtSum(
        uint256 _roundId
    ) public view returns (uint256) {
        uint256 totalSquareSqrtSum = 0;
        for (uint256 i = 0; i < roundArticles[_roundId].length; i++) {
            require(roundArticles[_roundId].length > 0, "No articles in round");
            Article storage article = roundArticles[_roundId][i];
            uint256 sqrtSum = recievedDonationsWithinRound[article.author][
                article.id
            ][_roundId];
            totalSquareSqrtSum += sqrtSum ** 2;
        }
        return totalSquareSqrtSum;
    }

    function getMatchingAmount(
        uint256 _roundId,
        address _author,
        uint256 _articleId
    ) public view returns (uint256) {
        require(_roundId < roundLength, "Round does not exist");
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        require(
            authorToArticleIdToRound[_author][_articleId].id == _roundId,
            "Author has not applied for this round"
        );
        uint256 totalSquareSqrtSum = getTotalSquareSqrtSum(_roundId);
        uint256 suquareSqrtSum = recievedDonationsWithinRound[_author][
            _articleId
        ][_roundId] ** 2;
        Round storage round = rounds[_roundId];
        uint256 matching = (round.poolAmount * suquareSqrtSum) /
            totalSquareSqrtSum;
        return matching;
    }

    function getEstimatedAmount(
        uint256 _roundId,
        address _author,
        uint256 _articleId,
        uint256 _amount
    ) public view returns (uint256) {
        Round storage round = rounds[_roundId];
        uint256 totalSquareSqrtSum = getTotalSquareSqrtSum(_roundId);
        uint256 sqrtSum = recievedDonationsWithinRound[_author][_articleId][
            _roundId
        ];
        uint256 newSquareSqrtSum = (sqrtSum + QF.sqrt(_amount)) ** 2;
        uint256 oldMatching = getMatchingAmount(_roundId, _author, _articleId);

        uint256 newMatching = (round.poolAmount * newSquareSqrtSum) /
            totalSquareSqrtSum;
        return newMatching - oldMatching;
    }

    function getAllocation(
        uint256 _roundId,
        address _author,
        uint256 _articleId
    ) public view returns (uint256) {
        require(_roundId < roundLength, "Round does not exist");
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        require(
            authorToArticleIdToRound[_author][_articleId].id == _roundId,
            "Author has not applied for this round"
        );

        return matchingAmounts[_roundId][_author][_articleId];
    }

    function getSquareRoot(uint256 x) public pure returns (uint256) {
        return QF.sqrt(x);
    }

    function getAppliedArticle(
        uint256 _roundId,
        uint256 _index
    ) public view returns (Article memory) {
        require(roundArticles[_roundId].length > 0, "No articles in round");
        return roundArticles[_roundId][_index];
    }

    function getAuthorArticle(
        address _author,
        uint256 _articleId
    ) public view returns (Article memory) {
        return authorArticles[_author][_articleId];
    }

    function getAllAuthorArticle(
        address _author
    ) public view returns (Article[] memory) {
        return authorArticles[_author];
    }

    function getAppliedRound(
        address _author,
        uint256 _articleId
    ) public view returns (Round memory) {
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        return authorToArticleIdToRound[_author][_articleId];
    }

    function getRoundLength() public view returns (uint256) {
        return roundLength;
    }

    function getRound(uint256 _roundId) public view returns (Round memory) {
        require(_roundId < roundLength, "Round does not exist");
        return rounds[_roundId];
    }

    function getAllRound() public view returns (Round[] memory) {
        return rounds;
    }

    function getDonatedAmount(
        address _author,
        uint256 _articleId
    ) public view returns (uint256) {
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        return authorArticles[_author][_articleId].donationsReceived;
    }

    function getRecievedDonationsWithinRound(
        address _author,
        uint256 _articleId,
        uint256 _roundId
    ) public view returns (uint256) {
        require(_roundId < roundLength, "Round does not exist");
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        require(
            authorToArticleIdToRound[_author][_articleId].id == _roundId,
            "Author has not applied for this round"
        );
        return recievedDonationsWithinRound[_author][_articleId][_roundId];
    }

    function getApplicationStatus(
        uint256 _roundId,
        address _author,
        uint256 _articleId
    ) public view returns (ApplicationStatus) {
        require(_roundId < roundLength, "Round does not exist");
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        require(
            authorToArticleIdToRound[_author][_articleId].id == _roundId,
            "Author has not applied for this round"
        );
        return applicationStatusForRound[_author][_articleId][_roundId];
    }

    function checkOwner(
        address _sender,
        address _author,
        uint256 _articleId
    ) public view returns (bool) {
        require(
            _articleId < authorArticles[_author].length,
            "Article does not exist"
        );
        return nft.checkOwner(_sender, _author, _articleId);
    }
}
