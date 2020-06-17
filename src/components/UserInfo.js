import React from 'react';
import { Card, CardBody, CardHeader, Container, Row, Table, Button } from 'reactstrap';

const UserInfo = (user) => {

    if (!user.info) {
        user.info = JSON.parse(localStorage.getItem('user'));
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <img src={'../../assets/img/avatars/100.png'} className="img-avatar center-element-fb" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="col-md-8">
                        {/* <p>Informazioni sull'utente</p>
                        <h3>{user.info.name} {user.info.surname}</h3>
                        <div className="row">>
                            <p>Email: {user.info.email} </p><button>Modifica</button>
                        </div>
                        <div className="row">>
                            <p>Password: {user.info.password} </p><button>Modifica</button>
                        </div> */}
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>User id: {user.info._id}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                        <tr>
                                            <td>Nome</td>
                                            <td><strong>{user.info.name}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Cognome</td>
                                            <td><strong>{user.info.surname}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td><strong>{user.info.email}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td><strong>{user.info.password}</strong> <Button> Modifica</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserInfo;