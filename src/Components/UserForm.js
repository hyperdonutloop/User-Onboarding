import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";


const UserForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        status && setUser(user => [...user, status]);
    }, [status]);


    return (
        <div className= "new-user-form">
            <h1>Hello, who are you?</h1>
            <Form>
                <Field 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                />
                {touched.name && errors.name && <p className="errors">{errors.name}</p>}
                <Field 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                />
                {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                <Field 
                    type="text" 
                    name="password" 
                    placeholder="Password" 
                />
                {touched.password && errors.password && <p className="errors">{errors.password}</p>}
                <label className="checkbox-container"> Agree to Terms and Conditions
                    <Field 
                        type="checkbox" 
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {user.map (newUser => (
                <ul key={newUser.id}>
                    <li>Name: {newUser.name}</li>
                    <li>Email: {newUser.email}</li>
                    <li>Password: {newUser.password}</li>
                </ul>
            ))}
        </div>


    )

}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Do not leave this blank!"),
        email: Yup.string().required("You can't leave this blank either!"),
        password: Yup.string().required("Dude, just no.")

    }),    
    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            setStatus(res.data);
            
        })
        .catch(err => console.log(err.response));
    }
    

})(UserForm);

export default FormikUserForm;