import { useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const PayByRazorPay = (props) => {
    const options = {
        key: 'rzp_test_OPMIPhpWImR4cZ',
        amount: props.amount * 100, //  = INR 1
        name: 'Unfold Innovates',
        description: 'Grow Together',
        image: 'https://unfold-public.s3.ap-south-1.amazonaws.com/logo.svg',
        order_id: props.orderid,
        handler: function(response) {
            alert(response.razorpay_payment_id);
        },
        notes: {
            address: props.address
        },
        theme: {
            color: '#E0FFFF',
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
            <Button onClick={openPayModal}>Complete Payment</Button>
        </>
    );
};

export default PayByRazorPay;