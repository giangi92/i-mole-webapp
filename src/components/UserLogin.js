import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupText, CInputGroupPrepend, CRow } from '@coreui/react';
import logo from '../assets/logo/imole-logo.png';
import { AppNavbarBrand, CAlert } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import UserContext from '../Contexts/UserContext'

const UserLogin = () => {
    var [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [goToDashboard, setGoToDashboard] = useState(false);

    let sessionExpired = false;
    let showSessionExpiredMessage = false;

    let userContext = useContext(UserContext)

    if(localStorage.getItem("sessionToken") && !userContext.logged){
        showSessionExpiredMessage = true;
        console.log('Sessione scaduta, mostrare messaggio');
        
    }

    var [password, setPassword] = useState('');
    console.log("userState", userContext.isLogged);

    if (userContext.isLogged) {
        return (
            <div>
                <Redirect to="/dashboard" />
            </div>
        )
    }

    // if(sessionToken && jwt.verify(sessionToken))
    //  return(<Redirect to='/dasboard'></Redirect>)

    const submitCredentials = (e) => {
        //e.preventDefault();
        console.log('email inserita?', email);
        // setEmail(event)
        // console.log("current email:",email)
        fetch("/user/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.error) {
                    setValidEmail(false);
                    console.log('email inserita non valida validEmail:', validEmail)
                } else {
                    localStorage.setItem('sessionToken', data.sessionToken);
                    console.log(data);
                    // const user = new User(data);
                    userContext.setLoggedUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    setGoToDashboard(true);
                    userContext.setLogged(true);
                    // console.log(localStorage.getItem("sessionToken"));
                }
            })
    }
    if (goToDashboard) {
        return (
            <div>
                <Redirect to="/dashboard" />
            </div>
        )
    } else
        return (
            <div>
                <div className='d-flex justify-content-center align-items-center space-allaround'>
                    {/* <h1 className='display-1'>Giangisoft</h1> */}
                    <img src={logo} alt="Imole-logo"></img>
                </div>
                
                <div className="align-items-center">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md="8">
                                <CCardGroup>
                                    <CCard className="p-4">
                                        <CCardBody>
                                        {showSessionExpiredMessage && 
                                            <CAlert color="info" closeButton fade>
                                                Sessione scaduta, rieffettuare l'accesso
                                            </CAlert>}
                                            <CForm>
                                                <h1>Login</h1>
                                                <p className="text-muted">Sign In to your account</p>
                                                {!validEmail && <p className="red-border">Email o password non corrette</p>}
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupPrepend addonType="prepend">
                                                        <CInputGroupText>
                                                            {/* <i className="icon-user"></i> */}
                                                            <CIcon name={'cilUser'}></CIcon>
                                                        </CInputGroupText>
                                                    </CInputGroupPrepend>
                                                    <CInput type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </CInputGroup>
                                                <CInputGroup className="mb-4">
                                                    <CInputGroupPrepend addonType="prepend">
                                                        <CInputGroupText>
                                                            <CIcon name={'cil-lock-locked'}></CIcon>
                                                        </CInputGroupText>
                                                    </CInputGroupPrepend>
                                                    <CInput type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                </CInputGroup>
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CButton onClick={(e)=>submitCredentials(e)} CColor="primary" className="px-4">Login</CButton>
                                                    </CCol>
                                                    <CCol xs="6" className="text-right">
                                                        <CButton CColor="link" className="px-0">Forgot password?</CButton>
                                                    </CCol>
                                                </CRow>
                                            </CForm>
                                        </CCardBody>
                                    </CCard>
                                    <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                        <CCardBody className="text-center">
                                            <div>
                                                <h2>Sign up</h2>
                                                <p>Registrati ad I-Mole</p>
                                                <Link to="/userRegister">
                                                    <CButton color="success" className="m-3" active>
                                                        Register Now!
                                                    </CButton>
                                                </Link>
                                            </div>
                                        </CCardBody>
                                    </CCard>
                                </CCardGroup>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </div>

        )
}

export default UserLogin;