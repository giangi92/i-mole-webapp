import React from 'react'
import loginroutes from '../Routes/login-routes'
import {
    Redirect,
    Route,
    Switch
  } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

const TheLogin = (props) => {
    return (
        <div>
            <CContainer fluid>
                <Switch>
                    {loginroutes.map((route, idx) => {
                        return route.component && (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                            <CFade>
                                <route.component {...props} />
                            </CFade>
                            )} />
                        )
                    })}
                    <Redirect from="/" to="/userLogin" />
                </Switch>
            </CContainer>
            
        </div>
    )
}

export default TheLogin;