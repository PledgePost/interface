// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract WorkCredentialNFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIdCounter;

    struct TokenData {
        address minterAddress;
        string description;
        string imageUrl;
    }

    mapping(uint256 => TokenData) private _tokenData;
    string private _defaultImageUrl;

    event Burned(address indexed oparator, uint256 indexed tokenId);

    function setImageUrl(uint256 tokenId, string memory imageUrl) public {
        require(_exists(tokenId), "URI query for nonexistent token");
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        TokenData storage tokenData = _tokenData[tokenId];
        tokenData.imageUrl = imageUrl;
    }

    constructor(
        string memory defaultImageUrl
    ) ERC721("ArticleSupporter NFT", "AST") {
        _defaultImageUrl = defaultImageUrl;
    }

    function setDefaultImageUrl(string memory defaultImageUrl) public {
        _defaultImageUrl = defaultImageUrl;
    }

    function mint(
        address minterAddress,
        string memory description
    ) public payable onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(minterAddress, tokenId);

        TokenData storage tokenData = _tokenData[tokenId];
        tokenData.minterAddress = minterAddress;
        tokenData.description = description;

        if (bytes(tokenData.imageUrl).length == 0) {
            tokenData.imageUrl = _defaultImageUrl;
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");

        TokenData memory tokenData = _tokenData[tokenId];

        bytes memory attributes = abi.encodePacked(
            '{"trait_type": "ID", "value": "',
            tokenId.toString(),
            '"},',
            '{"trait_type": "name", "value": "',
            "D-Work Credential NFT 2023",
            '"}'
        );

        string memory imageUrl = bytes(tokenData.imageUrl).length > 0
            ? tokenData.imageUrl
            : _defaultImageUrl;

        bytes memory metadata = abi.encodePacked(
            '{"name": "D-Work Credential NFT 2023 #',
            tokenId.toString(),
            '", "description": "',
            tokenData.description,
            '", "image": "',
            imageUrl,
            '", "attributes": [',
            attributes,
            "]}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(metadata)
                )
            );
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        require(
            from == address(0) || to == address(0),
            "Err: This token is not transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function burn(uint256[] memory tokenId) external {
        for (uint256 i = 0; i < tokenId.length; i++) {
            _burn(tokenId[i]);
            emit Burned(msg.sender, tokenId[i]);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function getImageUrl(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        TokenData memory tokenData = _tokenData[tokenId];
        return
            bytes(tokenData.imageUrl).length > 0
                ? tokenData.imageUrl
                : _defaultImageUrl;
    }
}
