// import React, { useContext, useEffect, useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const CheckoutForm = ({ price, email, username,title,author,img}) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [amount, setAmount] = useState(price);
    
//     console.log("checkout from", username, email)

//     // console.log(account)

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements) {
//             setLoading(false);
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { error, paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,

//                 billing_details: {
//                     email: sessionStorage.getItem('email'),
//                     name: sessionStorage.getItem('username')
//                 }
//             }, {
//                 amount: amount * 100, // Convert to cents
//                 currency: 'inr', // Indian Rupees
//             }
//             );
//             if (error) {
//                 console.error('Error creating payment method:', error);
//                 setError(error.message);
//             } else {
//                 console.log('Payment Method created:', paymentMethod);


//                 const response = await fetch('http://localhost:3001/api/checkout/submit', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ payment_method_id: paymentMethod.id, amount: amount * 100, email: sessionStorage.getItem('email'), username: sessionStorage.getItem('username'),title:title,author:author,img:img }),
//                 })
//                 if (response.ok) {
//                     toast.success('Payment Sucessfull', { position: 'top-right' });
//                     if (cardElement) {
//                         cardElement.clear();
//                     }
//                 }
//                 else {
//                     toast.error('Payment Unsuccessfull');
//                 }
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Payment failed. Please try again.');
//             toast.error('Payment failed. Please try again.', { position: 'top-right' });
//         }

//         setLoading(false);
//     };


//     return (
//         <form onSubmit={handleSubmit} className='p-3'>
//             <ToastContainer />
//             <div style={{ maxWidth: '600px', margin: 'auto' }}>
//                 <h1 htmlFor="card-element" className='alert alert-primary fs-6' style={{ textAlign: 'center' }}>
//                     Payment Gateway
//                 </h1>
//                 <CardElement
//                     id="card-element" className='mt-4'
//                     options={{
//                         style: {
//                             base: {
//                                 fontSize: '16px',
//                                 fontFamily: 'Arial, sans-serif',
//                                 color: '#424770',
//                                 '::placeholder': {
//                                     color: '#aab7c4',
//                                 },
//                             },
//                             invalid: {
//                                 color: '#9e2146',
//                             },
//                         },
//                     }}
//                 />
//                 {error && (
//                     <div className="alert alert-danger mt-3" role="alert">
//                         {error}
//                     </div>
//                 )}
//                 <button
//                     className="btn btn-primary mt-4"
//                     type="submit"
//                     disabled={!stripe || loading}
//                 >
//                     {loading ? 'Processing...' : 'Pay Now'}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default CheckoutForm;
// import React, { useState } from 'react';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CheckoutForm = ({ price, email, username, title, author, img }) => {
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [amount, setAmount] = useState(price);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         // Detect Ethereum provider (MetaMask)
//         const provider = await detectEthereumProvider();
//         if (!provider) {
//             setError('Please install MetaMask!');
//             setLoading(false);
//             return;
//         }

//         // Create Web3 instance
//         const web3 = new Web3(provider);

//         try {
//             // Request account access
//             const accounts = await web3.eth.requestAccounts();
//             const fromAddress = accounts[0];

//             // Define the smart contract details
//             const contractAddress = '0xYourContractAddress'; // Replace with your smart contract address
//             const contractABI = [
//                 {
//                   "inputs": [
//                     {
//                       "internalType": "string",
//                       "name": "_title",
//                       "type": "string"
//                     },
//                     {
//                       "internalType": "string",
//                       "name": "_author",
//                       "type": "string"
//                     },
//                     {
//                       "internalType": "string",
//                       "name": "_img",
//                       "type": "string"
//                     }
//                   ],
//                   "name": "payForBook",
//                   "outputs": [],
//                   "stateMutability": "payable",
//                   "type": "function"
//                 },
//                 {
//                   "inputs": [],
//                   "name": "withdraw",
//                   "outputs": [],
//                   "stateMutability": "nonpayable",
//                   "type": "function"
//                 },
//                 {
//                   "inputs": [],
//                   "name": "getTransactionCount",
//                   "outputs": [
//                     {
//                       "internalType": "uint256",
//                       "name": "",
//                       "type": "uint256"
//                     }
//                   ],
//                   "stateMutability": "view",
//                   "type": "function"
//                 },
//                 {
//                   "inputs": [
//                     {
//                       "internalType": "uint256",
//                       "name": "index",
//                       "type": "uint256"
//                     }
//                   ],
//                   "name": "getTransaction",
//                   "outputs": [
//                     {
//                       "internalType": "address",
//                       "name": "buyer",
//                       "type": "address"
//                     },
//                     {
//                       "internalType": "uint256",
//                       "name": "amount",
//                       "type": "uint256"
//                     },
//                     {
//                       "internalType": "string",
//                       "name": "title",
//                       "type": "string"
//                     },
//                     {
//                       "internalType": "string",
//                       "name": "author",
//                       "type": "string"
//                     },
//                     {
//                       "internalType": "string",
//                       "name": "img",
//                       "type": "string"
//                     }
//                   ],
//                   "stateMutability": "view",
//                   "type": "function"
//                 }
//               ];
//             const contract = new web3.eth.Contract(contractABI, contractAddress);

//             // Convert amount to Wei
//             const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

//             // Send transaction
//             const tx = {
//                 from: fromAddress,
//                 to: contractAddress,
//                 value: amountInWei,
//                 gas: 2000000,
//             };

//             const receipt = await web3.eth.sendTransaction(tx);

//             // Notify success
//             toast.success('Payment Successful!', { position: 'top-right' });

//             // Clear form or handle post-payment logic
//             setAmount('');
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Payment failed. Please try again.');
//             toast.error('Payment failed. Please try again.', { position: 'top-right' });
//         }

//         setLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className='p-3'>
//             <ToastContainer />
//             <div style={{ maxWidth: '600px', margin: 'auto' }}>
//                 <h1 className='alert alert-primary fs-6' style={{ textAlign: 'center' }}>
//                     Blockchain Payment
//                 </h1>
//                 <div>
//                     <p>Amount: {amount} ETH</p>
//                 </div>
//                 {error && (
//                     <div className="alert alert-danger mt-3" role="alert">
//                         {error}
//                     </div>
//                 )}
//                 <button
//                     className="btn btn-primary mt-4"
//                     type="submit"
//                     disabled={loading}
//                 >
//                     {loading ? 'Processing...' : 'Pay Now'}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default CheckoutForm;
import React, { useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CheckoutForm = ({ price, email, username, title, author, img }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(price);
    const [transactionId, setTransactionId] = useState('');
    const [data,setData]=useState({title:title,author:author,price:price,email:sessionStorage.getItem('email'),username:sessionStorage.getItem('username'),transactionId:'',date:'',status:'Successful',orderid:'',img:img});


    function generateOrderId(){
        const timestamp = new Date().getTime().toString(); // Convert timestamp to string
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Ensure random number is 6 digits
    
        // Combine timestamp and random, truncate to fixed length if necessary
        const uniqueId = `${timestamp}${random}`.slice(-12); // Total length of 12 characters
        return uniqueId;
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Detect Ethereum provider (MetaMask)
        const provider = await detectEthereumProvider();
        if (!provider) {
            setError('Please install MetaMask!');
            setLoading(false);
            return;
        }

        // Create Web3 instance
        const web3 = new Web3(provider);

        try {
            // Request account access
            const accounts = await web3.eth.requestAccounts();
            const fromAddress = accounts[0];

            // Define the smart contract details
            const contractAddress = '0xYourContractAddress'; // Replace with your smart contract address
            const contractABI = [
                {
                  "inputs": [
                    {
                      "internalType": "string",
                      "name": "_title",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "_author",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "_img",
                      "type": "string"
                    }
                  ],
                  "name": "payForBook",
                  "outputs": [],
                  "stateMutability": "payable",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "withdraw",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "getTransactionCount",
                  "outputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "index",
                      "type": "uint256"
                    }
                  ],
                  "name": "getTransaction",
                  "outputs": [
                    {
                      "internalType": "address",
                      "name": "buyer",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "amount",
                      "type": "uint256"
                    },
                    {
                      "internalType": "string",
                      "name": "title",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "author",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "img",
                      "type": "string"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                }
              ];
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            // Convert amount to Wei
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

            // Send transaction
            const tx = {
                from: fromAddress,
                to: contractAddress,
                value: amountInWei,
                gas: 2000000,
            };

            const receipt = await web3.eth.sendTransaction(tx);
            const orderid=generateOrderId();
            setData({...data,orderid:orderid,transactionId:receipt.transactionHash,date:Date.now()});
            // Notify success and set transaction ID
            const response=await axios.post('http://localhost:3001/api/checkout/submit',data);
            if (response.status===200){
            toast.success('Payment Successful!', { position: 'top-right' });
            setTransactionId(receipt.transactionHash);

            // Clear form or handle post-payment logic
            setAmount('');}
            else{
                throw response.data
            }
        } catch (error) {
            // console.error('Error:', error);
            setError('Payment failed. Please try again.');
            toast.error('Payment failed. Please try again.', { position: 'top-right' });
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className='p-3'>
            <ToastContainer />
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <h1 className='alert alert-primary fs-6' style={{ textAlign: 'center' }}>
                    Blockchain Payment
                </h1>
                <div>
                    <p>Amount: {amount} ETH</p>
                </div>
                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
                {transactionId && (
                    <div className="alert alert-success mt-3" role="alert">
                        Transaction ID: <a href={`https://etherscan.io/tx/${transactionId}`} target="_blank" rel="noopener noreferrer">{transactionId}</a>
                    </div>
                )}
                <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
