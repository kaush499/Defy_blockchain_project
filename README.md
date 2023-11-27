## Description

The Project introduces a groundbreaking application of blockchain, emphasizing its evolution beyond cryptocurrencies. The project innovatively addresses insecure voting systems using decentralized finance (DeFi) and Solidity contracts on Ethereum, aiming to enhance security and transparency. Overall, it signals a shift toward a decentralized paradigm to contribute to the evolution of democratic processes and financial systems.

## Installation

### Setup

- **Node.js**

    ##
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
      nvm install v16.14.2
      nvm current 
      npm -v
   ##


- **Truffle**
  ##
      sudo npm install -g truffle
  ##

- **MetaMask** installation guide can be found in [here](https://metamask.io/).

### Commands

- Install necessarily Node.js packages

      npm install --force

- To run etherium clients locally

      truffle develop

- Deploy smart contracts to the Ethereum blockchain

      truffle migrate --reset
      
- Deploy and run the front-end application

      npm start run

- Add local network to Metamask

Follow the below image, to add new network.

<img width="922" alt="Screen Shot 2023-11-26 at 10 47 55 PM" src="https://github.com/kaush499/Defy_blockchain_project/assets/35135441/641b50a9-4864-4353-b56a-308af77823f8">

Shift to Localhost network.

<img width="957" alt="Screen Shot 2023-11-26 at 10 48 07 PM" src="https://github.com/kaush499/Defy_blockchain_project/assets/35135441/524ecc5b-6001-457d-ac2b-f750db322a92">

- Run the scripts to issue tokens

      truffle exec scripts/issue-tokens.js

Demo of the Defy  [Youtube video]().
