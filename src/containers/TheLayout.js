import React, {useState, useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
  TheLogin
} from './index'

// import {
//   Redirect,
//   Route,
//   Switch
// } from 'react-router-dom'

import TokenCheckerRedirect,{TokenChecker} from '../components/TokenChecker'
// import UserLogin from '../components/UserLogin'
// import UserRegister from '../components/UserRegister'


const TheLayout = () => {

  const [logged, setLogged] = useState(TokenChecker());
    let [loggedUser, setLoggedUser] = useState(undefined);
    //setLogged(TokenChecker());
    useEffect(() => {

        console.log('Utente è loggato?', logged);
        if(logged)
          setLoggedUser(JSON.parse(localStorage.getItem('user')));

    },[logged])

  return (
    <div>
      {logged ? (
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
      )
      : (
        <div>
          <TheLogin isLogged={logged} setLogged={setLogged} setLoggedUser={setLoggedUser}></TheLogin>
        </div>
      )}
    </div>
    
  )
}

export default TheLayout
