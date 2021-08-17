const FruitToken = artifacts.require("FruitToken")
const SeedToken = artifacts.require("SeedToken")
const YieldFarm = artifacts.require("YieldFarm")

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('YieldFarm', ([owner, investor]) => {
    let seedToken, fruitToken, yieldFarm

    before(async () => {
      seedToken = await SeedToken.new()
      fruitToken = await FruitToken.new()
      yieldFarm = await YieldFarm.new(seedToken.address, fruitToken.address)

      await seedToken.transfer(yieldFarm.address, tokens("1000000"))
      await fruitToken.transfer(investor, tokens("100"), { from: owner })
    })

    describe('Seed Token deployment', async () => {
        it('has a name', async () => {
          const name = await seedToken.name()
          assert.equal(name, 'Seed Token')
        })
      })

    describe('Fruit Token deployment', async () => {
      it('has a name', async () => {
        const name = await fruitToken.name()
        assert.equal(name, 'Fruit Token')
      })
    })
    
    describe('Yield Farm deployment', async () => {
      it('has a name', async () => {
        const name = await yieldFarm.name()
        assert.equal(name, 'Yield Farm')
      })

      it('Contract has tokens', async () => {
        let balance = await fruitToken.balanceOf(yieldFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))
      })
    })

    describe('Farming token', async () => {

      it('rewards investors for staking Seed tokens', async () => {
        let result
        // Check investor balance before staking
        result = await seedToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor SEED wallet balance correct before staking')

        // Stake Mock DAI Tokens
        await seedToken.approve(yieldFarm.address, tokens('100'), { from: investor })
        await yieldFarm.stakeTokens(tokens('100'), { from: investor })

        // Check staking result
        result = await seedToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('0'), 'investor SEED wallet balance correct after staking')

        result = await seedToken.balanceOf(yieldFarm.address)
        assert.equal(result.toString(), tokens('100'), 'Token Farm SEED balance correct after staking')

        result = await yieldFarm.stakingBalance(investor)
        assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

        result = await yieldFarm.isStaking(investor)
        assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

        // Issue Tokens
        await yieldFarm.issueTokens({ from: owner })

        // Check balances after issuance
        result = await fruitToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor FRUIT wallet balance correct affter issuance')

        // Ensure that only onwer can issue tokens
        await yieldFarm.issueTokens({ from: investor }).should.be.rejected;

        // Unstake tokens
        await yieldFarm.unstakeTokens({ from: investor })

        // Check results after unstaking
        result = await seedToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor SEED wallet balance correct after staking')

        result = await seedToken.balanceOf(yieldFarm.address)
        assert.equal(result.toString(), tokens('0'), 'Token Farm SEED balance correct after staking')

        result = await yieldFarm.stakingBalance(investor)
        assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

        result = await yieldFarm.isStaking(investor)
        assert.equal(result.toString(), 'false', 'investor staking status correct after staking')


      })
    })



})