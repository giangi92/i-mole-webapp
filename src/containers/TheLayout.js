import React, {useState, useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
  TheLogin
} from './index'

import { Redirect } from 'react-router';

import TokenCheckerRedirect,{TokenChecker, TokenCheckerSetState} from '../components/TokenChecker'

const TheLayout = () => {

  let verify = TokenChecker()
  const [logged, setLogged] = useState(verify);
  let [loggedUser, setLoggedUser] = useState(undefined);

  if(logged && !verify){
    setLogged(false);
  }

  useEffect(() => {

      console.log('Utente è loggato?', logged);
      if(logged)
        setLoggedUser(JSON.parse(localStorage.getItem('user')));

  },[logged])


  return (
    <div>
      {!logged ? (
        <div>
          <TheLogin isLogged={logged} setLogged={setLogged} setLoggedUser={setLoggedUser}></TheLogin>
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
    </div>
    
  )
}

export default TheLayout
