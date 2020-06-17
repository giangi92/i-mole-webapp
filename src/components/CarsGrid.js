import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class CarsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Make", field: "make", sortable: true, filter: true, checkboxSelection: true
            }, {
                headerName: "Model", field: "model", sortable: true, filter: true
            }, {
                headerName: "Price", field: "price", sortable: true, filter: true
            }],
            rowData: [{
                make: "Toyota", model: "Celica", price: 35000
            }, {
                make: "Ford", model: "Mondeo", price: 32000
            }, {
                make: "Porsche", model: "Boxter", price: 72000
            }]
        }
    }

    onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    render() {
        return (
            <div
                className="ag-theme-material"
                style={{
                    height: '250px',
                    width: '605px'
                }}
            >
                <button className="btn btn-primary space-allaround" onClick={this.onButtonClick}>Get selected rows</button>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    rowSelection="multiple"
                    onGridReady={params => this.gridApi = params.api}
                >
                </AgGridReact>
            </div>
        );
    }
}

export default CarsGrid;