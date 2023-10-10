// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// create Interface for PoolContract
interface IPoolContract {
    function initialize(IERC20 _token) external;

    function poolTransfer(address _to, uint256 _amount) external returns (bool);
}
