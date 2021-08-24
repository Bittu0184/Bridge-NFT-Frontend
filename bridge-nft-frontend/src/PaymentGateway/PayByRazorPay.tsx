import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import configData from '../Config.json';

const PayByRazorPay = (props) => {
    let history = useHistory();
    const options = {
        key: '',
        amount: props.amount * 100, //  = INR 1
        name: 'Unfold Innovates',
        description: 'Grow Together',
        image: 'https://unfold-public.s3.ap-south-1.amazonaws.com/logo.svg',
        order_id: props.orderid,
        handler: function(response) {
            let dataToPass = {
                "razorpay_payment_id":response.razorpay_payment_id,
                "razorpay_order_id":response.razorpay_order_id,
                "razorpay_signature":response.razorpay_signature
            }
            console.log("data " + JSON.stringify(dataToPass));
            axios.post(process.env.REACT_APP_API_BASE_URI + configData.apiVerifySignature, dataToPass)
            .then(response => {
                console.log(JSON.stringify(response.data))
                console.log(JSON.stringify(this.props))
                history.push('/paymentsuccess')
            })
            .catch(error => {
                console.log("Error: " + error);
                history.push('/paymentfail')
            });
            
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
        rzp1.on('payment.failed', function (response){    
            alert(response.error.code);    
            alert(response.error.description);    
            alert(response.error.source);    
            alert(response.error.step);    
            alert(response.error.reason);    
            alert(response.error.metadata.order_id);    
            alert(response.error.metadata.payment_id);
        })
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

export default withRouter(PayByRazorPay);