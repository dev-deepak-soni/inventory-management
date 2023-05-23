import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { APIUrl, postData } from '../config/Fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Signup = () => {

    return (
        <Formik
            initialValues={{ name: '', surname: '', email: '', password: '', confirmpassword: '', city: '', state: '', zip: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Please enter email address.'),
                name: Yup.string().required('Please Enter name'),
                surname: Yup.string().required('Please Enter surname'),
                city: Yup.string().required('Please Enter city'),
                state: Yup.string().required('Please Enter state'),
                zip: Yup.string().required('Please Enter zip'),
                password: Yup.string()
                    .max(15, 'Must be 15 characters or less.')
                    .min(4, 'Must be 4 characters.')
                    .required('Please enter password.')
            })}
            onSubmit={async (values, { setSubmitting }) => {

                const { name, surname, email, password, city, state, zip } = values;
                const res = await postData(APIUrl + 'signup', { name, surname, email, password, city, state, zip });
                console.log('res', res);
                toast.warn(res.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


                setSubmitting(false);
            }}
        >
            <Form className="w-full lg:w-[70%] lg:ml-[15%] m-2 p-4 border border-red-900 shadow-lg">

                <div className="font-bold text-lg text-center">Signup Form</div>
                <div className="flex flex-wrap -mx-3 mb-6 text-center mt-5">
                    <div className="w-full px-3">

                        <button
                            className='hidden'
                            type="button"
                            id='buttonDiv'
                        >
                            Sign up Using Google
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            First Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" name="name" type="text" placeholder="Jane" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="name" /></p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="surname">
                            Last Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="surname" name="surname" type="text" placeholder="Doe" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="surname" /></p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" name="email" type="text" placeholder="Email" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="email" /></p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" name="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="password" /></p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="confirmpassword" name="confirmpassword" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="confirmpassword" /></p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='city' id="city" type="text" placeholder="Indore" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="city" /></p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                            State
                        </label>
                        <div className="relative">
                            <Field className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state" name='state' as="select">
                                <option>Madhya Pradesh</option>
                                <option>Delhi</option>
                                <option>Gujrat</option>
                                <option>Maharashtra</option>
                            </Field>
                            <p className="text-red-500 text-xs italic"><ErrorMessage name="state" /></p>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zip">
                            Zip
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zip" name="zip" type="text" placeholder="452001" />
                        <p className="text-red-500 text-xs italic"><ErrorMessage name="zip" /></p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 mt-4 text-center">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            SignUp
                        </button>
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6 text-right">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Already have account with us?
                        </label>

                        <Link to='/'> <p className="text-gray-600 text-xs italic">Login here</p></Link>
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

export default Signup