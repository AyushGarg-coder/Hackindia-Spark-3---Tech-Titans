import { useEffect, useState } from 'react';
import './Addbooks.css'
import axios from 'axios'
import { Navigate, redirect } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';


const initialValue = {
    title: '',
    description: '',
    subtitle: '',
    author: '',
    url1: '',
    url2: '',
    price: '',
    genre: '',
    flipkart: '',
    amazon: '',
    kobo: '',
    // pincode:''
}

const AddBooks = () => {

    const [post, setPost] = useState(initialValue);
    const [refresh, setRefresh] = useState(false);



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        // console.log(post.pincode);
    }

    const handleClick = async () => {
        try {
            if (post.title != '') {
                const response = await axios.post('http://localhost:3001/addbooks', post);
                if (response.status === 200) {
                    toast.success('Books added Successfully', { position: 'top-right' });
                    setPost(initialValue);
                    setRefresh(true);
                }
            }
            else{
                toast.error('Fields cannot be Null');
            }
        }
        catch (err) {
            alert(err.response.data);
        }
    }

    useEffect(() => {
        setRefresh(false);
        redirect('/addbooks');
    }, [refresh])


    return (
        <div className='min-vh-100'>
            <ToastContainer />
            <div className="container text-center border border-2 mt-2 mb-1">
                <div className='mt-3'>
                    <h1 className="alert alert-primary mt-1">Add Books</h1>
                </div>
                <div>
                    <input onChange={handleChange} name='title' value={post.title} className="form-control mt-2 p-2" placeholder="Enter Title" required />
                    <input onChange={handleChange} name='price' value={post.price} className="form-control mt-2 p-2" placeholder="Enter Price" required />
                    <input onChange={handleChange} name='subtitle' value={post.subtitle} className="form-control mt-2 p-2" placeholder="Enter Subtitle" required />
                    <input onChange={handleChange} name='description' value={post.description} className="form-control mt-2 p-2" placeholder="Enter Description" required />
                    <input onChange={handleChange} name='author' value={post.author} className="form-control mt-2 p-2" placeholder="Enter Author" required />
                    <input onChange={handleChange} name='genre' value={post.genre} className="form-control mt-2 p-2" placeholder="Enter Genre" required />
                    <input onChange={handleChange} name='url1' value={post.url1} className="form-control mt-2 p-2" placeholder="Enter Url" required />
                    <input onChange={handleChange} name='url2' value={post.url2} className="form-control mt-2 p-2" placeholder="Enter Url" required />
                    <input onChange={handleChange} name='flipkart' value={post.flipkart} className="form-control mt-2 p-2" placeholder="Enter Flipkart Url" required />
                    <input onChange={handleChange} name='amazon' value={post.amazon} className="form-control mt-2 p-2" placeholder="Enter Amazon Url" required />
                    <input onChange={handleChange} name='kobo' value={post.kobo} className="form-control mt-2 p-2" placeholder="Enter Kobo Url" required />
                    {/* <input onChange={handleChange} name='pincode' value={post.pincode} className='form-control mt-2 p-2' placeholder='Enter the Pincode Separated by comma e.g. 110080,110060,521000'/> */}
                </div>
                <div>
                    <button className="btn btn-outline-danger mt-4 mb-4 p-2 w-25 fs-5 fw-bold" onClick={handleClick}>ADD</button>
                </div>
            </div>
        </div>
    )

}

export default AddBooks;