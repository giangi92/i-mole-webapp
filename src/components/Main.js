import React, { useState, useEffect, Suspense } from 'react';
import BodyContent from './Employees';
import Header from './Header';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import About from './About';
import Homepage from './Homepage';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import UserInfo from './UserInfo';
import { Redirect } from 'react-router';
import {
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppFooter,
    AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import TokenCheckerRedirect, { TokenChecker } from './TokenChecker';
import { Button } from 'reactstrap';

// sidebar nav config

const navigation =
{
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'success',
                text: 'NEW',
            },
        },
        {
            name: 'Utenti',
            url: '/users',
            icon: 'icon-user',
            badge: {
                variant: 'info'

            },
        },
        {
            name: 'Info',
            url: '/about',
            icon: 'icon-question',
            badge: {
                variant: 'info',
                text: 'NEW',
            },
        },
        {
            name: 'Impostazioni',
            url: '/about',
            icon: 'icon-settings',
            badge: {

                text: 'VECCHIO',
            },
        }
    ]
}

const CoreUserInterface = () => {

    const [logged, setLogged] = useState(TokenChecker());
    let [loggedUser, setLoggedUser] = useState(undefined);

    useEffect(() => {

        const isCorrect = TokenChecker();
        console.log('Utente è loggato?', logged);

        setLoggedUser(JSON.parse(localStorage.getItem('user')));

        //setLogged(loggedUser && isCorrect);
    },[logged])

    return (
        <div>
            {logged ?
                (
                    <Router>
                        <div className="app">
                            <AppHeader fixed>
                                <Suspense>
                                    <Header isLogged={logged} setLogged={setLogged} userInfo = {loggedUser} />
                                </Suspense>
                            </AppHeader>

                            <div className="app-body">

                                <AppSidebar fixed display="lg">
                                    <AppSidebarHeader />
                                    <AppSidebarForm />
                                    <Suspense>
                                        <AppSidebarNav navConfig={navigation} router={router} />
                                    </Suspense>
                                    <AppSidebarFooter />
                                    <AppSidebarMinimizer />
                                </AppSidebar>
                                <main className="main space-allaround">
                                    {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                                    <Switch>

                                        <Route path="/about">
                                            <About></About>
                                        </Route>
                                        <Route path="/users">
                                            <TokenCheckerRedirect uri="users"></TokenCheckerRedirect>
                                            <BodyContent loggedUser={loggedUser} />
                                        </Route>

                                        <Route path="/dashboard">
                                            <TokenCheckerRedirect uri="dashboard"></TokenCheckerRedirect>
                                            <Homepage></Homepage>
                                        </Route>

                                        <Route path="/userInfo">
                                            <TokenCheckerRedirect uri="userInfo"></TokenCheckerRedirect>
                                            <UserInfo info={loggedUser}></UserInfo>
                                        </Route>

                                        <Route path="/">
                                            <p>Sessione scaduta, rieffettua il login.</p>

                                            <Button onClick={() => {
                                                localStorage.removeItem('sessionToken');
                                                setLogged(false);
                                                return (<div>
                                                    <Redirect to='/'></Redirect>
                                                </div>)
                                            }}>Alla login</Button>
                                        </Route>

                                    </Switch>
                                </main>

                            </div>
                            <div>
                                <Suspense>
                                    <AppFooter>
                                        <Suspense>
                                            Imole® - All rights reserved
                                        </Suspense>
                                    </AppFooter>
                                </Suspense>
                            </div>

                            {/* <footer className="app-footer">
                                Giangisoft® - All rights reserved
                            </footer> */}

                        </div>
                    </Router>
                )
                :
                (
                    <Router>
                        <>
                            <Switch>
                                <Route path="/register">
                                    <UserRegister />
                                </Route>
                                <Route path="/">
                                    <UserLogin isLogged={logged} setLogged={setLogged} setLoggedUser={setLoggedUser} />
                                </Route>
                            </Switch>
                        </>
                    </Router>
                )
            }


        </div>
    )
}

export default CoreUserInterface;