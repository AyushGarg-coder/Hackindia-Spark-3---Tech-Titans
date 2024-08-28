import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Addbooks.css'
function Cardcall() {

  const [post,setPost]=useState([])

useEffect(()=>{
  async function handleContent(){
    try{
      const result=await axios.get('http://localhost:3001/getbooks');
      if(result.status===200){
        setPost(result.data)
      }
    }
    catch(err){
      alert(err.response.message)
    }
  }
  handleContent();
},[])

  return (  
    <div className='min-vh_100' style={{marginBottom:'10px'}}>
      {/* <img src={require('./banner.jpg')} className='img-fluid w-100 banner' style={{height:'28rem'}}/> */}
      {/* <h1 className='text-center mt-4 fs-1 fw-bold p-3'>Our Products</h1> */}
    <div className="d-flex flex-wrap app ms-sm-auto me-sm-auto">
      {(post.map((book)=>(
        <Card 
        key={book._id}
        title={book.title}
        price={book.price}
        url_cover={book.url1}
        url_bg={book.url2}
        subtitle={book.subtitle}
        author={book.author}
        description={book.description}
        genre={book.genre}
        id={book._id}
        flipkart={book.flipkart}
        amazon={book.amazon}
        kobo={book.kobo}
        />
      )))}
    </div>
    </div>
  );
}

export default Cardcall;


// stripe id : alksyx5u2h@vvatxiy.com
// cluster id :alksyx5u2h
// cluster password:aBVKeDU5OyvKJQOr