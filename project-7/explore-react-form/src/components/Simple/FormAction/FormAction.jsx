import React from 'react';

const FormAction = () => {

    const handleFormAction = (FormData) =>{
        console.log(FormData.get("name"));
        // console.log(FormData.get('email'))
    }
    return (
        <div>
            <form action={handleFormAction}>
                <input type="text" name='name' placeholder='Name' />
                <br />
                <input type="email" name='email' placeholder='Email' /> 
                <br />
                <input type="submit" value="Submit" />               
            </form>
        </div>
    );
};

export default FormAction;