require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const privateKey = process.env.PRIVATEKEY;

console.log({ privateKey });

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: 'https://rpc-mumbai.maticvigil.com',
    //   accounts: [privateKey],
    // },
    // rinkeby: {
    // url: 'https://rinkeby.infura.io/v3/bed4fdcc76bb4978a9a3103ef0946f64',
    //   accounts: [privateKey],
    // },
  },
  solidity: '0.8.4',
};
