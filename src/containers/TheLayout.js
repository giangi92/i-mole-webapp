import React, {useState, useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import {TokenChecker} from '../components/TokenChecker'
import UserLogin from '../components/UserLogin'
import UserRegister from '../components/UserRegister'


const TheLayout = () => {

  const [logged, setLogged] = useState(TokenChecker());
    let [loggedUser, setLoggedUser] = useState(undefined);
    //setLogged(TokenChecker());
    useEffect(() => {

        const isCorrect = TokenChecker();
        console.log('Utente è loggato?', logged);

        setLoggedUser(JSON.parse(localStorage.getItem('user')));

        //setLogged(loggedUser && isCorrect);
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
            <>
              <Switch>
                  <Route path="/userRegister">
                      <UserRegister />
                  </Route>
                  <Route path="/">
                      <UserLogin isLogged={logged} setLogged={setLogged} setLoggedUser={setLoggedUser} />
                  </Route>
              </Switch>
            </>
        </div>
      )}
    </div>
    
  )
}

export default TheLayout
