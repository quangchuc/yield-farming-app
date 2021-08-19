import React, { Component } from 'react'
import Web3 from 'web3'
import SeedToken from '../build/contracts/SeedToken.json'
import FruitToken from '../build/contracts/FruitToken.json'
import YieldFarm from '../build/contracts/YieldFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load SeedToken
    const seedTokenData = SeedToken.networks[networkId]
    if(seedTokenData) {
      const seedToken = new web3.eth.Contract(SeedToken.abi, seedTokenData.address)
      this.setState({ seedToken })
      let seedTokenBalance = await seedToken.methods.balanceOf(this.state.account).call()
      this.setState({ seedTokenBalance: seedTokenBalance.toString() })
    } else {
      window.alert('SeedToken contract not deployed to detected network.')
    }

    // Load FruitToken
    const fruitTokenData = FruitToken.networks[networkId]
    if(fruitTokenData) {
      const fruitToken = new web3.eth.Contract(FruitToken.abi, fruitTokenData.address)
      this.setState({ fruitToken })
      let fruitTokenBalance = await fruitToken.methods.balanceOf(this.state.account).call()
      this.setState({ fruitTokenBalance: fruitTokenBalance.toString() })
    } else {
      window.alert('FruitToken contract not deployed to detected network.')
    }
    
    // Load YieldFarm
    const yieldFarmData = YieldFarm.networks[networkId]
    if(yieldFarmData) {
      const yieldFarm = new web3.eth.Contract(YieldFarm.abi, yieldFarmData.address)
      this.setState({ yieldFarm })
      let stakingBalance = await yieldFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('YieldFarm contract not deployed to detected network.')
    }
    
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.seedToken.methods.approve(this.state.yieldFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.yieldFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.yieldFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      seedToken: {},
      fruitToken: {},
      yieldFarm: {},
      seedTokenBalance: '0',
      fruitTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        seedTokenBalance={this.state.seedTokenBalance}
        fruitTokenBalance={this.state.fruitTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.fruituniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
