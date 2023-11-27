const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const RealAssetToken = artifacts.require("RealAssetToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed();

    // Deploy Dapp Token
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();

    // Deploy Real Asset Token
    await deployer.deploy(RealAssetToken, "Real Asset Token", "RAT", 18);
    const realAssetToken = await RealAssetToken.deployed();

    // Deploy TokenFarm with Dapp Token, Dai Token, and Real Asset Token addresses
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address, realAssetToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // Transfer all Dapp tokens to TokenFarm (1 million)
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

    // Transfer 100 Mock DAI tokens to investor
	await daiToken.approve(accounts[9], '1000000000000000000000000')
    await daiToken.transfer(accounts[9], '1000000000000000000000000');
	await realAssetToken.issueAssetTokens(accounts[9],'1000000000000000000000000')
    // Additional setup for Real Asset Token can be added here if needed
};