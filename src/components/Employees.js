import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import LoadingPopup from './LoadingPopup';
import ChartModal from './ChartModal';
import { CCol, CNav,CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs, CCard, CCardBody } from '@coreui/react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import TokenCheckerRedirect from './TokenChecker';

const Employees = () => {
    const [employeeData, setEmployeeData] = useState(undefined);
    const [loadingPopup, setLoading] = useState(false);
    const [chartModalVisible, setChartModalVisible] = useState(false);

    function toggle() {
        setLoading(!loadingPopup);
    }

    function toggleChartModal() {
        setChartModalVisible(!chartModalVisible);
    }

    const retrieveEmployees = () => {
        setLoading(true);

        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                setEmployeeData(data);
                setLoading(false);
            })
            .catch(console.log)
    }

    const NewTabSystem = () => {
        return (
            <div>
                <CCard>
                    <CCardBody>
                        <CTabs>
                            <CNav variant="tabs">
                                <CNavItem>
                                <CNavLink>
                                    Lista brutta
                                </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                <CNavLink>
                                    Lista più carina
                                </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                <CNavLink>
                                    Sorpresa
                                </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent>
                                <CTabPane>
                                <div>
                                    <button type="button" className="btn btn-info little-spacing" onClick={retrieveEmployees}>Show Employees</button>
                                    {employeeData && <button type="button" className="btn btn-info little-spacing" onClick={toggleChartModal} >Show Salaries</button>}
                                    {loadingPopup && <LoadingPopup show={loadingPopup} />}
                                    {employeeData && <EmployeeCard data={employeeData} />}
                                    {chartModalVisible && <ChartModal data={employeeData} show={chartModalVisible} toggle={toggleChartModal} />}
                                </div>
                                </CTabPane>
                                <CTabPane>
                                 <CoolEmployeesList></CoolEmployeesList>
                                </CTabPane>
                                <CTabPane>
                                {`Ciccio Cappuccio`}
                                <br></br>
                                {'Camillo Capello'}
                                </CTabPane>
                            </CTabContent>
                        </CTabs>
                    </CCardBody>
                </CCard>
                
            </div>
        )
    }

    const CoolEmployeesList = () => {

        let gridApi = {};

        const [users, setUsers] = useState([]);
        let loggedUser = localStorage.getItem('user') || undefined;
        if(loggedUser){
            loggedUser = JSON.parse(loggedUser);
        }

        let auth = '';
        if (loggedUser){
            console.log("Ciao",loggedUser.name);
            
            console.log('l utente è loggato correttamente, accessToken è:',loggedUser.sessionToken);
            
            auth = 'JWT ' + loggedUser.sessionToken;
        }else{
            console.log('devi ancora loggarti');
            
        }

        const columnDefs = [{
            headerName: "Name", field: "name", sortable: true, filter: true, checkboxSelection: true, editable: true
        }, {
            headerName: "Email", field: "email", sortable: true, filter: true, editable: true
        }, {
            headerName: "Salary", field: "salary", sortable: true, filter: true, editable: true
        }, {
            headerName: "Da licenziare?", field: "firedable", sortable: true, filter: true, editable: true
        }];

        useEffect(() => {
            if (loggedUser) {
                fetch('/employees', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth
                    }
                })
                    .then(result => result.json()).then((employees) => {

                        if (employees && (employees.length > 0)) setUsers(employees)
                    })
            }

        }, [])

        return (
            <div className="ag-theme-material"
                style={{
                    height: '500px',
                    width: '100%'
                }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 150,
                        resizable: true
                    }}
                    rowData={users}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={params => gridApi = params.api}
                    onCellValueChanged={((field) => {

                        console.log("campo modificato:", field.data);

                        fetch("/employees/update",
                            {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(field.data)
                            })
                            .then(function (res) { return res.json(); })
                            .then(function (data) { console.log(data) })
                    })}
                >
                </AgGridReact>
            </div>
        )
    }

    const Tabs = () => {
        const [activeTab, setActiveTab] = useState('1');

        console.log(activeTab);

        function toggle(tab) {

            setActiveTab(tab);
        }

        function tabPane() {
            return (
                <>
                    <CTabPane tabId="1">
                        <div>
                            <button type="button" className="btn btn-info little-spacing" onClick={retrieveEmployees}>Show Employees</button>
                            {employeeData && <button type="button" className="btn btn-info little-spacing" onClick={toggleChartModal} >Show Salaries</button>}
                            {loadingPopup && <LoadingPopup show={loadingPopup} />}
                            {employeeData && <EmployeeCard data={employeeData} />}
                            {chartModalVisible && <ChartModal data={employeeData} show={chartModalVisible} toggle={toggleChartModal} />}
                        </div>
                    </CTabPane>
                    <CTabPane tabId="2">
                        <CoolEmployeesList></CoolEmployeesList>
                    </CTabPane>
                    <CTabPane tabId="3">
                        Ciccio Cappuccio
                    </CTabPane>
                </>
            );
        }

        return (
            <div>
                <div className="animated fadeIn">
                    <CRow>
                        <CCol xs="12" md="100%" className="mb-4">
                            <CNav tabs>
                                <CNavItem>
                                    <CNavLink
                                        active={activeTab === '1'}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        Lista brutta
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeTab === '2'}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Lista più carina
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        active={activeTab === '3'}
                                        onClick={() => { toggle('3'); }}
                                    >
                                        Sorpresa
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent activeTab={activeTab}>
                                {tabPane()}
                            </CTabContent>
                        </CCol>
                    </CRow>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>Raccolta informazioni dei dipendenti</h1>
            {/** Menu a tab per separare la vecchia lista con la nuova fatta con ag-grid */}
            {/* <TokenCheckerRedirect uri="users"></TokenCheckerRedirect> */}
            {/* <Tabs></Tabs> */}
            <NewTabSystem></NewTabSystem>
        </div>
    )
}

export default Employees;