const FruitToken = artifacts.require('FruitToken')
const SeedToken = artifacts.require('SeedToken')
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(SeedToken)
  const seedToken = await SeedToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(FruitToken)
  const fruitToken = await FruitToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, fruitToken.address, seedToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await fruitToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await seedToken.transfer(accounts[1], '100000000000000000000')
}