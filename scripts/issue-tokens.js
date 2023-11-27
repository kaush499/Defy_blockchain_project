const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(callback_func) {
	let tokenFarm = await TokenFarm.deployed()
	await tokenFarm.issueTokens()	
	console.log("Tokens issued!")
	callback_func()
}