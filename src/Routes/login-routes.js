import React from 'react';

const UserLogin = React.lazy(()=>import('../components/UserLogin'))
const UserRegister = React.lazy(()=>import('../components/UserRegister'))
const UserRecoverPassword = React.lazy(()=>import('../components/UserRecoverPassword'))
const UserPassReset = React.lazy(()=>import('../components/UserPassReset'))

const loginroutes = [
    { path: '/userLogin', exact: true, name: 'Login', component: UserLogin },
    { path: '/userRegister', name: 'Register', component: UserRegister },
    { path: '/userRecoverPass', name: 'Recover Pass', component: UserRecoverPassword },
    { path: '/reset:token', exact:true, name: 'Pass Reset', component: UserPassReset }
]

export default loginroutes;