// useEmail.js
import { useState } from 'react';
import emailjs from 'emailjs-com';



const useEmail = (serviceId : string, templateId : string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendEmail = (data : any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        emailjs.send(serviceId, templateId, data, "3ofxujAy6PPLgaV0C")
            .then((result) => {
                console.log('Email sent successfully!', result.text);
                setSuccess(true);
            }, (err) => {
                console.error('Failed to send email:', err.text);
                setError(err.text);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { sendEmail, loading, error, success };
};

export default useEmail;
