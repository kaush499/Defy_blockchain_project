import React, { Component } from 'react'
import dai from '../dai.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-2">
        <div className='d-flex justify-content-between'>
        <div className='card mb-4' style={{width: "45%"}}>
          <table className="table table-borderless text-muted text-center">
            {/* <thead>
              <tr>
                <th>Staking Balance</th>
                <th>Reward Balance</th>
                <th>Real Asset Staking Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
                <td>{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</td>
                <td>{window.web3.utils.fromWei(this.props.realAssetStakingBalance, 'Ether')} DAPP</td>
              </tr>
            </tbody> */}
            <thead>
              <tr>
                <th>Type of Balance</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Staking Balance</td>
                <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Reward Balance</td>
                <td>{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Real Asset Staking Balance</td>
                <td>{window.web3.utils.fromWei(this.props.realAssetStakingBalance, 'Ether')} mDAI</td>
              </tr>
            </tbody>
          </table>
        </div>

      <div className='d-flex flex-column' style={{width: "45%"}}>
        <div className="card mb-4" style={{width: "100%"}}>

        <div className="card-body">

          <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let amount
              amount = this.input.value.toString()
              amount = window.web3.utils.toWei(amount, 'Ether')
              this.props.stakeTokens(amount)
            }}>
            <div className='d-flex justify-content-center'>
              <label className="float-center"><h4>Stake Tokens</h4></label>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => { this.input = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
            </div>
            <div className='d-flex justify-content-end'>
              <p className="float-right text-muted">
                  <span className='font-weight-bold'>Remaining Balance</span>: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <button type="submit" style={{width: 'auto', height: "50px"}} className="btn btn-success btn-block">Stake Tokens</button>
              <button
                type="button"
                style={{width: 'auto', height: "50px", marginTop: "0px"}}
                className="btn btn-danger btn-block"
                onClick={(event) => {
                  event.preventDefault()
                  this.props.unstakeTokens()
                }}>
                  Unstake Tokens
                </button>
            </div>
            </form>
        </div>
        </div>

        <div className="card mb-4" style={{width: "100%"}}>
          <div className="card-body">
            <form onSubmit={(event) => {
              event.preventDefault()
              let amount
              amount = this.realAssetInput.value.toString()
              amount = window.web3.utils.toWei(amount, 'Ether')
              this.props.stakeRealAssetTokens(amount)
            }}>
              <div className='d-flex justify-content-center'>
                <label className="float-center"><h4>Real World Asset Tokens</h4></label>
              </div>
              
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.realAssetInput = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
              </div>
              <div className='d-flex justify-content-end'>
              <p className="float-right text-muted">
                  <span className='font-weight-bold'>Remaining Balance</span>: {window.web3.utils.fromWei(this.props.realAssetTokenBalance, 'Ether')}
              </p>
            </div>
              <div className='d-flex justify-content-between'>
                  <button style={{width: 'auto', height: "50px"}} type="submit" className="btn btn-success btn-block">Stake real assets</button>
                
                <button
                  className="btn btn-danger btn-block"
                  style={{width: 'auto', height: "50px", marginTop: "0px"}}
                  onClick={(event) => {
                    event.preventDefault()
                    this.props.unstakeRealAssetTokens()
                  }}>
                  Unstake real assets
                </button>
            </div>
            </form>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Main;
