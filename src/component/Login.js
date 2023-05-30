import logo from '../img/amw.png'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { APIUrl, postData } from '../config/Fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
// import GoogleButton from 'react-google-button'
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Please enter email address.'),
                password: Yup.string()
                    .max(15, 'Must be 15 characters or less.')
                    .min(8, 'Must be 8 characters.')
                    .required('Please enter password.')
            })}
            onSubmit={async (values, { setSubmitting }) => {

                const { email, password } = values;
                const res = await postData(APIUrl + 'login', { email, password });
                console.log('res', res);
                toast.error(res.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                if (res.success) {
                    localStorage.setItem('dashboard-login-alert', true);
                    navigate('/dashboard');
                }

                setSubmitting(false);
            }}
        >
            <Form className="w-full lg:w-[70%] lg:ml-[15%] m-2 p-4 border border-red-600 rounded-md shadow-2xl">
                <div className="text-center">
                    <img src={logo} alt='logo-amw' className='h-10 w-auto mx-auto' />
                </div>
                <div className="font-bold text-lg text-center mt-5">Login Form</div>
                <div className="flex flex-wrap -mx-3 mb-6 text-center mt-5">
                    <div className="mx-auto">
                        <GoogleLogin
                            onSuccess={async data => {
                                console.log(data);
                                try {
                                    const res = await postData(APIUrl + 'google/verify', { token :  data.credential, clientId : data.clientId, type : 'login'});
                                    console.log('res',res);
                                    if(!res.success){
                                        toast.error(res.msg);
                                    }else{
                                        localStorage.setItem('dashboard-login-alert', true);
                                        navigate('/dashboard');
                                    }
                                } catch (error) {
                                    toast.warn(error.message);
                                }
                                
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Email
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="email" name="email" id="email" placeholder="Jane" />
                        <p className="text-red-500 text-xs italic font-bold"><ErrorMessage name="email" /></p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Password
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="password" id="password" type="password" placeholder="Doe" />
                        <p className="text-red-500 text-xs italic font-bold"><ErrorMessage name="password" /></p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 text-center">
                    <div className="w-full px-3">
                        <label className="inline-block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Remember Me
                        </label>
                        <input className="ml-4" id="rememberme" type="checkbox" value="1" />
                        <p className="text-gray-600 text-xs italic">Make it as long     and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 text-center">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            Login
                        </button>
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6 text-right">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Don't have account with us?
                        </label>

                        <Link to='signup'> <p className="text-gray-600 text-xs italic">Signup here</p></Link>
                    </div>
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
            </Form>
        </Formik>
    )
}

export default Login