import React , { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
  } from '@coreui/react'
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const {name,email,password,error,success} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name,email,password}).then(data => {
            if(data.error) {
                setValues({...values,error:data.error,success: false })
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    

    const signUpFormNew = () => (
        <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                  <CInputGroupText>Name</CInputGroupText>

                    <CFormInput placeholder="Name" autoComplete="name" onChange={handleChange('name')} type="text"  value={name} />
                  </CInputGroup>


                  <CInputGroup className="mb-3">
                    <CInputGroupText>Email</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" onChange={handleChange('email')} type="email"  value={email} />
                  </CInputGroup>



                  <CInputGroup className="mb-3">
                    <CInputGroupText>Password
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange('password')}  value={password} 
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success"  onClick={clickSubmit}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );


    const showError = () =>(
        <div className = "alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSuccess = () =>(
        <div className = "alert alert-info" style={{display:success ? '' : 'none'}}>
            Signup done. Please 
            <Link to="/signin">
                Signin
            </Link>
        </div>
    )
    return(
    <Layout title = "Signup" description="Open world" className="container col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {signUpFormNew()}
            </Layout>
    )
}

export default Signup;