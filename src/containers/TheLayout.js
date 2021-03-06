import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
  TheLogin
} from './index'

import logo from '../assets/logo/imole-logo.png';

import UserContext from '../Contexts/UserContext'

import TokenCheckerRedirect,{TokenChecker, TokenCheckerSetState} from '../components/TokenChecker'

const TheLayout = () => {

  let verify = TokenChecker()
  const [logged, setLogged] = useState(verify);
  let [loggedUser, setLoggedUser] = useState(undefined);
  let contextObject = {};

  if(logged && !verify){
    setLogged(false);
  }

  useEffect(() => {

      console.log('Utente è loggato?', logged);
      if(logged)
        setLoggedUser(JSON.parse(localStorage.getItem('user')));

  },[logged])

  contextObject.isLogged = logged;
  contextObject.setLogged = setLogged;
  contextObject.setLoggedUser = setLoggedUser;

  return (
    <div>
      <UserContext.Provider value={contextObject}>
        {!logged ? (
          <div>
            <div className='d-flex justify-content-center align-items-center space-allaround'>
                  <Link to="/">
                      <img src={logo} alt="Imole-logo"></img>
                  </Link>
            </div>
            <TheLogin></TheLogin>
          </div>
        )
        
        : (
          <div className="c-app c-default-layout">
          <TheSidebar/>
          <div className="c-wrapper">
            <TheHeader isLogged={logged} setLogged={setLogged} userInfo = {loggedUser} />
            <div className="c-body">
              <TheContent/>
            </div>
            <TheFooter/>
          </div>
        </div>
        )}
      </UserContext.Provider>
      
    </div>
    
  )
}

export default TheLayout
