import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const Validation = () => {

    const initialValues = {
        name: '',
        age: '',
        email: '',
        phone: '',
        pass: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Name must have at least 2 characters")
            .max(100, "Name is too long"),

        age: Yup.number()
            .required("Age is required")
            .min(18, "Age must be at least 18"),

        email: Yup.string()
            .required("Email is required")
            .email("Enter a valid email"),

        phone: Yup.string()
            .required("Mobile number is required")
            .length(10, "Number must be 10 digits"),

        pass: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => console.log(values)
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                
                <input 
                    placeholder='Name' 
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange} 
                />
                {formik.errors.name && <p className='text-danger'>{formik.errors.name}</p>}

                <input 
                    placeholder='Age' 
                    name='age'
                    value={formik.values.age}
                    onChange={formik.handleChange} 
                />
                {formik.errors.age && <p className='text-danger'>{formik.errors.age}</p>}

                <input 
                    placeholder='Email' 
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange} 
                />
                {formik.errors.email && <p className='text-danger'>{formik.errors.email}</p>}

                <input 
                    placeholder='Phone' 
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange} 
                />
                {formik.errors.phone && <p className='text-danger'>{formik.errors.phone}</p>}

                <input 
                    placeholder='Password' 
                    type='password'
                    name='pass'
                    value={formik.values.pass}
                    onChange={formik.handleChange} 
                />
                {formik.errors.pass && <p className='text-danger'>{formik.errors.pass}</p>}

                <button type='submit'>Submit</button>

            </form>
        </div>
    );
}

export default Validation;
