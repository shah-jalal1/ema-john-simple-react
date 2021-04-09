import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardFrom from './SimpleCardFrom';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeCaSIuW9m5uNpESvNhVviCzvJtAb6fiF8TKxiJQL8GBjusqbROxYGdPMyq6tXJlwyAv5tIOzsxYjOwP7JzwMEP00eSrvx0sN');

const ProcessPayment = () => {
    return (
        <Elements stripe={stripePromise}>
           {/* <SimpleCardFrom></SimpleCardFrom> */}
           <SplitCardForm></SplitCardForm>
        </Elements>
    );
};

export default ProcessPayment;