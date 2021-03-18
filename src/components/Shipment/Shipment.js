import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import moduleName from './Shipment.css';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const onSubmit = data =>{
         console.log(data)
        };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        < form className="ship-form" onSubmit = { handleSubmit(onSubmit) } >

                < input name = "name" defaultValue={loggedInUser.name} ref = { register({ required: true })} placeholder="Your Name" />
                 { errors.name && <span className="error">Name is required</span> }

                 < input name = "email" defaultValue={loggedInUser.email} ref = { register({ required: true }) } placeholder="Your Email"/>
                 { errors.email && <span className="error">email is required</span> }

                 < input name = "address"  ref = { register({ required: true }) } 
                 placeholder="Your adress"/>
                 { errors.address && <span className="error">address is required</span> }


    <input type="submit" />
    </form >
  );
};

export default Shipment; <h1>This is shipment</h1>