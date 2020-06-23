import React from 'react';
import { CCard, CCardBody, CCardHeader, Table, CButton, CImg } from '@coreui/react';

const UserInfo = (user) => {
    let userInfo = user.info;
    console.log("Utente attuale da mostrare:", userInfo);
    
    if (!userInfo) {
        userInfo = JSON.parse(localStorage.getItem('user'));
        console.log("Utente attuale da mostrare:", userInfo);
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <CImg
                            src={'avatars/100.png'}
                            className="c-avatar-img"
                            alt="admin@bootstrapmaster.com"
                        />
                    </div>
                    <div className="col-md-8">
                        <CCard>
                            <CCardHeader>
                                <strong><i className="icon-info pr-1"></i>User id: {userInfo._id}</strong>
                            </CCardHeader>
                            <CCardBody>
                                {/* <CDataTable
                                    items={
                                        userInfo.name,
                                        userInfo.surname,
                                        userInfo.email,
                                        userInfo.password
                                    }
                                    fields={
                                        "Nome",
                                        "Cognome",
                                        "Email",
                                        "Password"
                                    }
                                responsive striped hover>
                                    </CDataTable> */}
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>Nome</td>
                                                <td><strong>{userInfo.name}</strong></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Cognome</td>
                                                <td><strong>{userInfo.surname}</strong></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td><strong>{userInfo.email}</strong></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Password</td>
                                                <td><strong>{userInfo.password}</strong></td>
                                                <td> <CButton> Modifica</CButton></td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </CCardBody>
                        </CCard>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserInfo;