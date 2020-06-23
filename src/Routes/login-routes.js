import React from 'react';

const UserLogin = React.lazy(()=>import('../components/UserLogin'))
const UserRegister = React.lazy(()=>import('../components/UserRegister'))

const loginroutes = [
    { path: '/userLogin', exact: true, name: 'Login', component: UserLogin },
    { path: '/userRegister', name: 'Register', component: UserRegister }
]

export default loginroutes;