// hardhat.config.js

require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

const { ALCHEMY_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.0",
    networks: {
        mainnet: {
            url: ALCHEMY_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        ropsten: {
            url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
        // Add other networks here if needed
    }
};
