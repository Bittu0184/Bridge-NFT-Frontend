import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const PayByRazorPay = (props) => {
    const options = {
        key: 'rzp_test_OPMIPhpWImR4cZ',
        amount: props.amount, //  = INR 1
        name: props.name,
        description: props.desc,
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Gaurav',
            contact: '9999999999',
            email: 'demo@demo.com'
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new (window as any).Razorpay(options)
        rzp1.on('payment.failed', function (response){    alert(response.error.code);    alert(response.error.description);    alert(response.error.source);    alert(response.error.step);    alert(response.error.reason);    alert(response.error.metadata.order_id);    alert(response.error.metadata.payment_id);})
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <Button onClick={openPayModal}>Pay with Razorpay</Button>
        </>
    );
};

export default PayByRazorPay;