import React, { Component } from 'react'
import seed from './images/seed.png'
import fruit from './images/fruit.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} SEED <img src={seed} height='32' alt=""/></td>
              <td>{window.web3.utils.fromWei(this.props.fruitTokenBalance, 'Ether')} FRUIT <img src={fruit} height='32' alt=""/></td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }}>
                
              <div>
                <label className="float-right">
                  Balance: {window.web3.utils.fromWei(this.props.seedTokenBalance, 'Ether')}
                </label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={seed} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; SEED
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UNSTAKE
              </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
