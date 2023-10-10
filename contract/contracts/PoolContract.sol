// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoolContract {
    IERC20 public token;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // owner should be the Core contract address
    constructor() {
        owner = msg.sender;
    }

    function initialize(IERC20 _token) external onlyOwner {
        token = _token;
    }

    function poolTransfer(
        address _to,
        uint256 _amount
    ) external onlyOwner returns (bool) {
        require(
            token.balanceOf(address(this)) >= _amount,
            "Not enough balance"
        );
        require(_to != address(0), "Invalid address");
        bool sent = token.transfer(_to, _amount);
        require(sent, "Failed to transfer token");
        return sent;
    }
}
