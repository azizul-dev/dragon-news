import React from 'react';
import useInputField from '../../hooks/useInputField';

const HookForm = () => {

    const [name, nameOnChange] = useInputField('');
    const [email, emailOnChange] = useInputField('');

    const handleSubmit = e =>{
        e.preventDefault();
        console.log('submit', name, email)
    }


    return (
        <div>
            <form onChange={handleSubmit}>

                <input defaultValue={name} type="text" onChange={nameOnChange}/>
                <br />
                <input type="email" onChange={emailOnChange} name="" id="" />
                <br />
                <input type="submit" value="Submit" />

            </form>
        </div>
    );
};

export default HookForm;