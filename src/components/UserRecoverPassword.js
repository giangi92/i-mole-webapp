import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupText, CInputGroupPrepend, CRow } from '@coreui/react';
import logo from '../assets/logo/imole-logo.png';
import CIcon from '@coreui/icons-react';
import { CAlert } from '@coreui/react';



const RecoverPassword = () => {
    var [email, setEmail] = useState('');
    const [showMessageSent, setShowMessageSent] = useState(false)
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const sendEmail = () => {
        console.log('Email a cui inviare la mail:',email);
        fetch("/user/recoverPass",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }).then(function (res) { setShowMessageSent(true); return res.json(); })
    }

    if(showMessageSent){
        // setTimeout(() => {
        //     setRedirectToLogin(true)
        //   }, 3000)
    }

    if(redirectToLogin){
        return(
            <div>
                <Redirect to="/userLogin" />
            </div>
        )
    }else{
        return (
            <div>
                <div className="align-items-center">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md="8">
                                <CCardGroup>
                                    <CCard className="p-4">
                                        <CCardBody>
                                            <CForm>
                                                <h1>Recupera password</h1>
                                                <p className="text-muted">Inserisci l'email con cui hai effettuato la registrazione</p>
                                                {showMessageSent && 
                                                <CAlert color="info" closeButton fade>
                                                    Sono state inviate le istruzioni di recupero all'indirizzo specificato. <Link to="/">Puoi tornare alla homepage</Link>
                                                </CAlert>}
                                                <CInputGroup className="mb-3">
                                                    <CInputGroupPrepend addonType="prepend">
                                                        <CInputGroupText>
                                                            {/* <i className="icon-user"></i> */}
                                                            <CIcon name={'cilUser'}></CIcon>
                                                        </CInputGroupText>
                                                    </CInputGroupPrepend>
                                                    <CInput type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </CInputGroup>
                                                
                                                <CRow>
                                                    <CCol xs="6">
                                                        <CButton onClick={()=>{sendEmail()}} CColor="c-primary" className="px-4">Invia</CButton>
                                                    </CCol>
                                                </CRow>
                                            </CForm>
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
}

export default RecoverPassword;