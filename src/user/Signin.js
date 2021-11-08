import React , { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin , authenticate, isAuthenticated} from "../auth";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
  } from '@coreui/react'
const Signin = () => {
    const [values, setValues] = useState({
        email: 'prapat@gmail.com',
        password: 'as068914112',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    const {email,password,error,loading,redirectToReferrer} = values
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true })
        signin({email,password}).then(data => {
            if(data.error) {
                setValues({...values,error: data.error,loading: false })
            }else{
                authenticate(data,() =>{
                    setValues({
                    ...values,
                    redirectToReferrer: true
                })
            })
                
            }
        })
    }

   
    const signInFormNew = () => (
       
        <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Sign in</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                      Email
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email"  onChange={handleChange('email')} type="email"  value={email} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Password</CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleChange('password')}  value={password} autoComplete="off"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol align="center">
                        <CButton color="primary" className="px-4" onClick={clickSubmit}>
                          Login
                        </CButton>
                      </CCol>
                   
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    
    
        );
    



























    const showError = () =>(
        <div className = "alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showLoading = () => loading && (
        <div className = "alert alert-info">
            <h2>Loading...</h2>
        </div>
    )
    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }
    return(
    <Layout title = "Signip" description="Sell everything" className="container col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {signInFormNew()}
        {redirectUser()}
    </Layout>
    )
}

export default Signin;