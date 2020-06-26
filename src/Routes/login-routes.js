import React from 'react';

const UserLogin = React.lazy(()=>import('../components/UserLogin'))
const UserRegister = React.lazy(()=>import('../components/UserRegister'))
const UserRecoverPassword = React.lazy(()=>import('../components/UserRecoverPassword'))

const loginroutes = [
    { path: '/userLogin', exact: true, name: 'Login', component: UserLogin },
    { path: '/userRegister', name: 'Register', component: UserRegister },
    { path: '/userRecoverPass', name: 'Recover Pass', component: UserRecoverPassword }
]

export default loginroutes;