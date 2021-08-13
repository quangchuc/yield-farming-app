// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SeedToken.sol";
import "./FruitToken.sol";

contract TokenFarm {
    
    // call it DefiBank
    string public name = "Yield farming app";
    address public owner;
    // create 2 state variables
    FruitToken public fruitToken;
    SeedToken public seedToken;

    // address[] public stakers;
    // mapping(address => uint) public stakingBalance;
    // mapping(address => bool) public hasStaked;
    // mapping(address => bool) public isStaking;

    // in constructor pass in the address for USDC token and your custom bank token
    // that will be used to pay interest
    constructor(FruitToken _fruitToken, SeedToken _seedToken) {
        fruitToken = _fruitToken;
        seedToken = _seedToken;
        owner = msg.sender;
    }

    // allow user to stake usdc tokens in contract
    
    // function stakeTokens(uint _amount) public {

    //     require(_amount > 0, "amount cannot be 0");

    //     // Trasnfer Seed tokens to contract for staking
    //     seedToken.transferFrom(msg.sender, address(this), _amount);

    //     // Update the staking balance in map
    //     stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    //     // Add user to stakers array if they haven't staked already
    //     if(!hasStaked[msg.sender]) {
    //         stakers.push(msg.sender);
    //     }

    //     // Update staking status to track
    //     isStaking[msg.sender] = true;
    //     hasStaked[msg.sender] = true;
    // }

        // allow user to unstake total balance and withdraw USDC from the contract
    
//      function unstakeTokens() public {

//     	// get the users staking balance in usdc
//     	uint balance = stakingBalance[msg.sender];
    
//         // reqire the amount staked needs to be greater then 0
//         require(balance > 0, "staking balance can not be 0");
    
//         // transfer usdc tokens out of this contract to the msg.sender
//         seedToken.transfer(msg.sender, balance);
    
//         // reset staking balance map to 0
//         stakingBalance[msg.sender] = 0;
    
//         // update the staking status
//         isStaking[msg.sender] = false;

// } 


    // Issue bank tokens as a reward for staking
    
    // function issueInterestToken() public {
    //     for (uint i=0; i<stakers.length; i++) {
    //         address recipient = stakers[i];
    //         uint balance = stakingBalance[recipient];
            
    // // if there is a balance transfer the SAME amount of bank tokens to the account that is staking as a reward
            
    //         if(balance >0 ) {
    //             fruitToken.transfer(recipient, balance);
    //         }
    //     }
    // }

}
