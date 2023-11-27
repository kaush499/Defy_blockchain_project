import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import RealAssetToken from '../abis/RealAssetToken.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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
    console.log("apprive", amount, this.state.tokenFarm._address)
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log(this.state.account, "inside account", amount, this.state.tokenFarm._address);
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        console.log(this.state.tokenFarm._address, "inside inside account", amount);
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      console.log(daiTokenBalance, "dai balace", daiTokenData.address, this.state.account);
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert('DappToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    console.log(tokenFarmData.address);
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })

      let realAssetStakingBalance = await tokenFarm.methods.realAssetStakingBalance(this.state.account).call()
      this.setState({ realAssetStakingBalance: realAssetStakingBalance.toString() })

    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }


    // Load RealAssetToken
    const realAssetTokenData = RealAssetToken.networks[networkId]
    if(realAssetTokenData) {
      const realAssetToken = new web3.eth.Contract(RealAssetToken.abi, realAssetTokenData.address)
      this.setState({ realAssetToken })
      let realAssetTokenBalance = await realAssetToken.methods.balanceOf(this.state.account).call()
      console.log(this.state.account)
      console.log(realAssetTokenBalance, "token");
      this.setState({ realAssetTokenBalance: realAssetTokenBalance.toString() })
    } else {
      window.alert('RealAssetToken contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  // Staking for real-world assets
  stakeRealAssetTokens = (amount) => {
    this.setState({ loading: true })
    this.state.realAssetToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeRealAssetTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  // Unstaking for real-world assets
  unstakeRealAssetTokens = () => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeRealAssetTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      realAssetToken: {}, // Added state for RealAssetToken
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      realAssetTokenBalance: '0', // Added state for RealAssetToken balance
      stakingBalance: '0',
      realAssetStakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        daiTokenBalance={this.state.daiTokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        realAssetTokenBalance={this.state.realAssetTokenBalance}
        unstakeRealAssetTokens={this.unstakeRealAssetTokens}
        stakeRealAssetTokens={this.stakeRealAssetTokens}
        realAssetStakingBalance={this.state.realAssetStakingBalance}
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
                  href="http://www.dappuniversity.com/bootcamp"
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
