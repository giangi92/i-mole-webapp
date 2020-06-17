import React from 'react';

const EmployeeCard = (employ) => {
    return (
        <div>
            <div className="card">
                <h5 className="card-header">Employees List</h5>
                {employ.data.map((e) => {
                    return (
                        <div key= {e.id} className="card-body">
                            <h5 className="card-title">Nome: {e.name}</h5>
                            <p className="card-text">Email: {e.email}</p>
                            <a href="#" className="btn btn-primary">Dettagli impegato</a>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EmployeeCard;