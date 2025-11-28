import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { langContext } from '../App';


const Loan = () => {

    const {lang}=useContext(langContext)
    const [emi, setemi] = useState(null)
    
    const [interest, setinterest] = useState(null)
    const [payment, setpayment] = useState(null)

    const initialValues = {
        amount: '',
        rate: '',
        year: ''
    }

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Loan amount is required")
            .positive("Must be positive"),

        rate: Yup.number()
            .required("Rate is required")
            .positive("Must be positive"),

        year: Yup.number()
            .required("Years are required")
            .positive("Must be positive")
    })

    function calculateEMI(amount, rate, year){
    const A = Number(amount);
    const R = Number(rate) / (12 * 100);
    const Y = Number(year) * 12;

    let power = 1;
    for (let i = 0; i < Y; i++) {
        power = power * (1 + R);
    }

    const emiValue = (A * R * power) / (power - 1);

    const totalPay = emiValue * Y;
    const interestPay = totalPay - A;

    return {
        emi: emiValue.toFixed(2),
        total: totalPay.toFixed(2),
        interest: interestPay.toFixed(2),
    };
};

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:(values) =>{
          const result = calculateEMI(
            values.amount,
            values.rate,
            values.year
          ) 
          setemi(result.emi);
        setpayment(result.total);
        setinterest(result.interest);
        }
    })

  function reset() {
        formik.resetForm();
        setemi(null);
        setinterest(null);
        setpayment(null);
    }


    return (
        <div>

            <h1>{lang}</h1>
            <form onSubmit={formik.handleSubmit} onReset={reset}>
                <input placeholder='Amount' name='amount' value={formik.values.amount} onChange={formik.handleChange}/>
                {formik.errors.amount && <p className='text-danger'>{formik.errors.amount}</p>}

                <input placeholder='Rate' name='rate' value={formik.values.rate} onChange={formik.handleChange} />
                {formik.errors.rate && <p className='text-danger'>{formik.errors.rate}</p>}

                <input placeholder='Year' name='year' value={formik.values.year} onChange={formik.handleChange} />
                {formik.errors.year && <p className='text-danger'>{formik.errors.year}</p>}

                <Button type='submit'>Calculate EMI</Button>
                <Button type='reset'>Reset</Button>
            </form>

            {emi && (
                <div>
                    <h3>Monthly EMI: ₹{emi}</h3>
                    <p>Total Interest: ₹{interest}</p>
                    <p>Total Payment: ₹{payment}</p>
                </div>
            )}
        </div>
    )
}

export default Loan;
