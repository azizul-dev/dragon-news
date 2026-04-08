import React, { useState } from 'react';

const Controlled = () => {


    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('')

    const [error, setError] = useState('');




    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(name,email, password)
        if(password.length < 6){
            setError('Password must be 6 characters or longer.')
        }else{
            setError('')
        }
    }

   const handleEmailChange = e =>{
    setEmail(e.target.value)
   }

   const handleNameChange = e =>{
    setName(e.target.value)
   }

    const handlePasswordOnChange = e =>{
        console.log(e.target.value);
        setPassword(e.target.value);

        // if(password.length < 6){
        //     setError("Password must be 6 characters or longer.")
        // }else{
        //     setError('');
        // }



    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="names" defaultValue={name} onChange={handleNameChange} placeholder='Name' />
                <br />
                <input type="email" onChange={handleEmailChange} defaultValue={email} name="email"  placeholder='Email' required/>
                <br />
                <input type="password" name="password"  placeholder='Password' onChange={handlePasswordOnChange} defaultValue={password} required/>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: 'red' }}>
                <small>{error}</small>
            </p>
        </div>
    );
};

export default Controlled;