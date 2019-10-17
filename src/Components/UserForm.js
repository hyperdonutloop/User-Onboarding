import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const UserForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        status && setUser(user => [...user, status]);
    }, [status]);

    const FormWrapper = styled.div`
        h1 {
            color: whitesmoke;
        }
        .namebox {
            padding: 10px;
        }
        .textbox {
            padding: 10px;
        }
        .passbox {
            padding: 10px;
        }
        .dropdown {
            padding: 10px;
        }
        .checkbox-container {
            padding: 10px;
            color: whitesmoke;
        } 
        .button {
            padding: 10px;
        }
    
    `;


    return (
        <FormWrapper>
            <div className= "new-user-form">
                <h1>Hello, who are you?</h1>
                <Form>
                    <div className="namebox">
                        <Field 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                        />
                    </div>
                    {touched.name && errors.name && <p className="errors">{errors.name}</p>}
                    <div className="textbox">
                        <Field 
                            type="text" 
                            name="email" 
                            placeholder="Email" 
                        />
                    </div>
                    {touched.email && errors.email && <p className="errors">{errors.email}</p>}
                    <div className="passbox">
                        <Field 
                            type="text" 
                            name="password" 
                            placeholder="Password" 
                        />
                    </div>
                    {touched.password && errors.password && <p className="errors">{errors.password}</p>}
                    <div className="dropdown">
                        <Field component="select" className="role-select" name="role">
                            <option>Please Choose Your Role</option>
                            <option value="engineer">Engineer</option>
                            <option value="engineer">Manager</option>
                            <option value="engineer">Wizard</option>
                        </Field>
                    </div>
                    <label className="checkbox-container"> Agree to Terms and Conditions
                        <Field 
                            type="checkbox" 
                            name="terms"
                            checked={values.terms}
                        />
                        <span className="checkmark" />
                    </label>
                    <div className="button">
                        <button type="submit">Submit!</button>
                    </div>
                </Form>
                {user.map (newUser => (
                    <ul key={newUser.id}>
                        <li>Name: {newUser.name}</li>
                        <li>Email: {newUser.email}</li>
                        <li>Password: {newUser.password}</li>
                    </ul>
                ))}
            </div>
        </FormWrapper>

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