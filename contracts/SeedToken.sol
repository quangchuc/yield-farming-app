// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./extensions/ERC20.sol";

contract SeedToken is ERC20 {
    address public admin;
    constructor() ERC20("Seed Token", "SEED") {
        _mint(msg.sender, 1000000 * 10 ** 18);
        admin = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, "Only admin can do it");
        _mint(to, amount);
    }
    
    function burn(address to, uint amount) external {
        _burn(msg.sender, amount);
    }

}