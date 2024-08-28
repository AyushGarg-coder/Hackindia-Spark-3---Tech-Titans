import React, { useState } from 'react';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import {toast} from 'react-toastify'
import axios from 'axios'
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            if (!formData.name || !formData.email || !formData.message) {
                setError('All fields are required');
                return;
            }
            const response=await axios.post('http://localhost:3001/contact',formData);
            if(response.status===200){
                setError(null);
                setSubmitted(true);
        
                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }
            else{
                toast.error(response.data);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    };

    return (
        <div className='min-vh-100'>
        <Container className="mt-5 border rounded border-dark w-50">
            <div className='mx-3'>
            <h1 className="text-center mb-4 mt-5">Contact Us</h1>
            <Form onSubmit={handleSubmit}>
                {submitted && !error && (
                    <Alert variant="success">
                        Thank you for reaching out! We will get back to you soon.
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="fas fa-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="fas fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-5 p-3'>
                    Send
                </Button>
            </Form>
            </div>
        </Container>
        </div>
    );
}

export default Contact;
