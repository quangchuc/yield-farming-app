const FruitToken = artifacts.require('FruitToken')
const SeedToken = artifacts.require('SeedToken')
const YieldFarm = artifacts.require("YieldFarm")

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('YieldFarm', (accounts) => {
    //let seedToken, fruitToken, yieldFarm

    describe('Seed Token deployment', async () => {
        it('has a name', async () => {
          const name = await seedToken.name()
          assert.equal(name, 'Seed Token')
        })
      })
})