// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookStore {
    // Define a structure to store transaction details
    struct BookTransaction {
        address buyer;
        uint256 amount;
        string title;
        string author;
        string img; // Optionally store an image URL or hash
    }

    // Store all transactions
    BookTransaction[] public transactions;

    // Event emitted when a payment is made
    event PaymentMade(
        address indexed buyer,
        uint256 amount,
        string title,
        string author,
        string img
    );

    // Function to accept payments
    function payForBook(string memory _title, string memory _author, string memory _img) public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");

        // Store the transaction
        transactions.push(BookTransaction({
            buyer: msg.sender,
            amount: msg.value,
            title: _title,
            author: _author,
            img: _img
        }));

        // Emit the PaymentMade event
        emit PaymentMade(msg.sender, msg.value, _title, _author, _img);
    }

    // Function to withdraw contract balance (only for contract owner or admin)
    function withdraw() public {
        // For simplicity, we allow anyone to withdraw funds. This is not recommended for production.
        // Add access control in a real contract.
        payable(msg.sender).transfer(address(this).balance);
    }

    // Function to get the number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    // Function to get transaction details by index
    function getTransaction(uint256 index) public view returns (address buyer, uint256 amount, string memory title, string memory author, string memory img) {
        require(index < transactions.length, "Transaction does not exist");
        BookTransaction storage tx = transactions[index];
        return (tx.buyer, tx.amount, tx.title, tx.author, tx.img);
    }
}