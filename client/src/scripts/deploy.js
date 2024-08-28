// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Compile the contract
    await hre.run('compile');

    // Get the contract factory
    const BookStore = await hre.ethers.getContractFactory("BookStore");

    // Deploy the contract
    const bookStore = await BookStore.deploy();

    console.log("BookStore deployed to:", bookStore.address);
}

// Run the script and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
