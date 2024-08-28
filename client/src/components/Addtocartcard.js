import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function textlimiter(str, limit) {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

const Addtocartcard = ({ item, setChange }) => {
    const [Quantity, setQuantity] = useState(item.quantity);
    const [Title, setTitle] = useState(item.title)
    const [Price, setPrice] = useState(item.price)
    const date = new Date();
    date.setDate(date.getDate() + 2)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const objdate = date.toLocaleDateString('en-US', options)

    const handleQuanityDecrease = async (e) => {
        e.preventDefault();
        try {
            if (Quantity > 1) {
                setQuantity(Quantity - 1);
                updateitemquantity(item._id, Quantity - 1);
                // console.log(Quantity);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    const handleQuantityIncrease = async (e) => {
        e.preventDefault();
        try {
            setQuantity(Quantity + 1);
            updateitemquantity(item._id, Quantity + 1);
            // console.log(Quantity);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const handleRemove = async () => {
        try{
            const user=sessionStorage.getItem('username');
            const id=item._id;
            let response=await axios.post('http://localhost:3001/removecart',{id,user});
            if(response.status===200){
                // toast.success(response.data);
                setChange(true);
            }
        }
        catch(err){
            toast.error(err.message)
        }
    }


    const updateitemquantity = async (id, count) => {
        try {
            const user = sessionStorage.getItem('username');
            let response = await axios.post('http://localhost:3001/updatequantity', { count, id, user });
            if (response.status === 200) {
                setChange(true);
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 1) {
                setQuantity(value);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="container border mt-2 rounded">
            <div className="row">
                <div className="card mt-2 mb-3 border-0">
                    <div className="row g-0">
                        <div className="col-md-4 d-flex flex-column align-items-center">
                            <img
                                src={item.img}
                                className="img-fluid mb-2"
                                style={{ objectFit: 'cover', width: '100%', height: 'auto', width: '10rem' }}
                                alt="Book cover"
                            />
                            <div className="container-fluid d-flex flex-row mb-2">
                                <button className="btn btn-outline-primary w-25" onClick={handleQuanityDecrease}>-</button>
                                <input
                                    type="number"
                                    className="text-center w-75 form-control"
                                    placeholder="1"
                                    onChange={handleChange}
                                    value={Quantity}
                                    min={1}
                                    readOnly
                                />
                                <button className="btn btn-outline-primary w-25" onClick={handleQuantityIncrease}>+</button>
                            </div>
                        </div>
                        <div className="col-md-8 mt-0">
                            <div className="card-body">
                                <h1 className="alert alert-warning fs-3">{textlimiter(Title, 35)}</h1>
                                <p className="mb-1">Format: Hardcover</p>
                                <p className="fw-bold mb-1 mt-25 mb-2">Rs. {Price}</p>
                                <div className="d-flex flex-row flex-wrap justify-content-between">
                                    <div>
                                        <p className="fw-bold mb-1">{objdate}</p>
                                        <p className="mb-0">Estimated Delivery</p>
                                    </div>
                                    <div>
                                        <p className="fw-bold mb-1">Rs. 10</p>
                                        <p className="mb-0">Shipping and Handling</p>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-primary mt-2 p-3" onClick={handleRemove}>
                                    <i className="fa fa-trash-o me-1"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addtocartcard;
