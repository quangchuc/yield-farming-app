// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint256) {
        uint256 c = a - b;
        require(b <= a, "SafeMath: substraction overflow");
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        require(a > 0 && b > 0, "SafeMath: multiply overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a / b;
        require(b == 0 || c == a / b, "SafeMath: divide overflow");
        return c;
    }
}