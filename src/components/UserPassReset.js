import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../assets/logo/imole-logo.png';

import { CAlert, CButton, CCard, CCardBody, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const UserPassReset = ({match}) => {
    
    var [password, setPassword] = useState('');
    var [retypePassword, setRetypePassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [goToLogin, setGoToLogin] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showExpiredAlert, setShowExpiredAlert] = useState(false);
    console.log('Token che devi mandare', match.params.token);

    useEffect(()=>{
      fetch("/user/reset/"+match.params.token,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.error) {
              console.log('Errore: ' + data.error.message)
            } else {
    
              console.log(data);
              if(data.tokenStatus === 'EXPIRED'){
                setShowExpiredAlert(true)
              }              
            }
          })
    },[])

    const submitCredentials = (e) => {
        e.preventDefault();
        setValidPassword(true);
    
        if (password !== retypePassword) {
          setValidPassword(false);
          return;
        }
    
        console.log('Token che devi mandare', match.params.token);
        
        // setEmail(event)
        // console.log("current email:",email)
        fetch("/user/reset/"+match.params.token,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
          })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.error) {
              console.log('Errore: ' + data.error.message)
            } else {
    
              console.log(data);
              setShowAlert(true);
              // const user = new User(data);
              setTimeout(() => {
    
                setGoToLogin(true);
              }, 3000)
              //alert('Registrato nuovo utente: ' + data.name + '. Effettua l`accesso');
              // console.log(localStorage.getItem("sessionToken"));
            }
          })
      }

      if (goToLogin) {
        return (
          <div>
            <Redirect to="/dashboard" />
          </div>
        )
      } else {return (
        <div>
            <div className="flex-row align-items-center"></div>
            <CContainer>
            <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                  {showAlert && 
                    <CAlert color="info" closeButton fade>
                        Password modificata con successo. Ritorno alla login.
                    </CAlert>}
                    {showExpiredAlert ? 
                    (<CAlert color="info" fade>
                        Link scaduto, <Link to="/userRecoverPass">effettuare una nuova richiesta di modifica password.</Link>
                    </CAlert>) 
                    :
                    (
                      <CForm>
                      <h1>Reimposta</h1>
                      <p className="text-muted">Reimposta la password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>
                            <CIcon name={'cil-lock-locked'}></CIcon>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                      </CInputGroup>
                      {!validPassword && <CAlert color="info" closeButton fade>
                        Le password non coincidono
                      </CAlert>}
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend addonType="prepend">
                            <CInputGroupText>
                              <CIcon name={'cil-lock-locked'}></CIcon>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Repeat password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} autoComplete="new-password" />
                        </CInputGroup>
                        <CButton color="success" block onClick={(e) => submitCredentials(e)}>Aggiorna</CButton>
                      </CForm>
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
    )}
}

export default UserPassReset;