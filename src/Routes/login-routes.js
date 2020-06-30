import React from 'react';

const UserLogin = React.lazy(()=>import('../components/UserLogin'))
const UserRegister = React.lazy(()=>import('../components/UserRegister'))
const UserRecoverPassword = React.lazy(()=>import('../components/UserRecoverPassword'))
const UserPassReset = React.lazy(()=>import('../components/UserPassReset'))
const UserAccountConfirm = React.lazy(()=>import('../components/UserAccountConfirm'))

const loginroutes = [
    { path: '/userLogin', exact: true, name: 'Login', component: UserLogin },
    { path: '/userRegister', name: 'Register', component: UserRegister },
    { path: '/userRecoverPass', name: 'Recover Pass', component: UserRecoverPassword },
    { path: '/reset:token', exact:true, name: 'Pass Reset', component: UserPassReset },
    { path: '/userConfirm:token', exact:true, name: 'Account confirm', component: UserAccountConfirm },
]

export default loginroutes;