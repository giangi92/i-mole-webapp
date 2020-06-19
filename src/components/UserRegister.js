import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../assets/logo/imole-logo.png';

import { CAlert, CButton, CCard, CCardBody, CCardFooter, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react';

const UserRegister = () => {

  var [name, setName] = useState('');
  var [surname, setSurname] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [retypePassword, setRetypePassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [goToLogin, setGoToLogin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const submitCredentials = (e) => {
    e.preventDefault();
    console.log('email inserita?', email);
    setValidEmail(true);
    setValidPassword(true);
    setShowAlert(false);

    if (password !== retypePassword) {
      setValidPassword(false);
      return;
    }

    // setEmail(event)
    // console.log("current email:",email)
    fetch("/user/register",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, password })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) {
          setValidEmail(false);
          console.log('Errore: ' + data.error.message, validEmail)
        } else {

          console.log(data);
          // const user = new User(data);
          localStorage.setItem('user', JSON.stringify(data));
          setShowAlert(true);
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
  } else {
    return (
      <div>
        <div className='d-flex justify-content-center align-items-center space-allaround'>
          {/* <h1 className='display-1'>Giangisoft</h1> */}
          <img src={logo} alt="Imole-logo"></img>
        </div>
        <div className="flex-row align-items-center">

          <CContainer>
            {showAlert && <CAlert variant="success">Registrazione avvenuta con successo. Reindirizzamento in corso...</CAlert>}
            <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm onSubmit={(e) => submitCredentials(e)}>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>
                            <i className="icon-user"></i>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>
                            <i className="icon-user"></i>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} autoComplete="surname" />
                      </CInputGroup>
                      {!validEmail && <p className="red-border">Email già in uso</p>}
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>
                            <i className="icon-lock"></i>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                      </CInputGroup>
                      {!validPassword && <p className="red-border">Password non coincidono</p>}
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend addonType="prepend">
                          <CInputGroupText>
                            <i className="icon-lock"></i>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Repeat password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} autoComplete="new-password" />
                      </CInputGroup>
                      <CButton CColor="success" block>Create Account</CButton>
                    </CForm>
                  </CCardBody>
                  <CCardFooter className="p-4">
                    <CRow>
                      <CCol xs="12" sm="6">
                        <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                      </CCol>
                      <CCol xs="12" sm="6">
                        <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                      </CCol>
                    </CRow>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>

    );
  }
}

export default UserRegister;
