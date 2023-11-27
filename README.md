## Description

    The Project introduces a groundbreaking application of blockchain, emphasizing its evolution beyond cryptocurrencies. The project innovatively addresses insecure voting systems using decentralized finance (DeFi) and Solidity contracts on Ethereum, aiming to enhance security and transparency. Overall, it signals a shift toward a decentralized paradigm to contribute to the evolution of democratic processes and financial systems.

## Installation

### Setup

- **Node.js**

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash    
    nvm install v16.14.2
    nvm current 
    npm -v


- **Truffle**

    sudo npm install -g truffle

- **Ganache** installation guide can be found in [here](https://www.trufflesuite.com/ganache).

- **MetaMask** installation guide can be found in [here](https://metamask.io/).

### Commands

- Install necessarily Node.js packages

      npm install --force

- Deploy smart contracts to the Ethereum blockchain

      truffle migrate --reset
      
- Deploy and run the front-end application

      npm start run
      
- Run the scripts to issue tokens

      truffle exec scripts/issue-tokens.js

Demo of the Defy  [Youtube video]().