const FruitToken = artifacts.require('FruitToken')
const SeedToken = artifacts.require('SeedToken')
const YieldFarm = artifacts.require("YieldFarm")

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(SeedToken)
  const seedToken = await SeedToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(FruitToken)
  const fruitToken = await FruitToken.deployed()

  // Deploy YieldFarm
  await deployer.deploy(YieldFarm, fruitToken.address, seedToken.address)
  const yieldFarm = await YieldFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await fruitToken.transfer(yieldFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await seedToken.transfer(accounts[1], '100000000000000000000')
}