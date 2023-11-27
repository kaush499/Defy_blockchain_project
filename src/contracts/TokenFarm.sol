pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";
import "./RealAssetToken.sol";

contract TokenFarm {
    string public name = "Dapp and Real asset Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;
    RealAssetToken public realAssetToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public realAssetStakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken, RealAssetToken _realAssetToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        realAssetToken = _realAssetToken;
        owner = msg.sender;
    }

    // Staking Tokens (DAI)
    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");

        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (DAI)
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "Staking balance cannot be 0");

        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // Staking Real-World Asset Tokens
    function stakeRealAssetTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");

        realAssetToken.transferFrom(msg.sender, address(this), _amount);

        realAssetStakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Real-World Asset Tokens
    function unstakeRealAssetTokens() public {
        uint256 balance = realAssetStakingBalance[msg.sender];
        require(balance > 0, "Staking balance cannot be 0");

        realAssetToken.transfer(msg.sender, balance);

        realAssetStakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens (Rewards)
    function issueTokens() public {
        require(msg.sender == owner, "Caller must be the owner");
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] + realAssetStakingBalance[recipient];
			
            if(balance > 0) {
                dappToken.transfer(recipient, balance/100);
            }
        }
    }

    // Additional functions can be added as needed
}