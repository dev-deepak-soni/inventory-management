import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {

    const [alert, setAlert] = useState(localStorage.getItem('dashboard-login-alert'))
    if (alert === 'true') {
        toast.success('Login success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        localStorage.setItem('dashboard-login-alert', false)
        setAlert(false);
    }

    return (
        <div>Dashboard

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default Dashboard