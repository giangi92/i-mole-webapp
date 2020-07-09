import React, {useState} from 'react';
import {CForm, CCard, CCardHeader, CCardBody, CInput, CButton, CLabel} from '@coreui/react'

const FileUpload = () => {

    const [filePos, setFilePos] = useState('');

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("file caricato:", e.target.files[0]);
    }
    
    const readFile = (e) => {
        e.preventDefault();
        console.log("file caricato:", e.target.files[0]);
    }

    return (
        <div>
            <h3>Carica il file da salvare in cloud</h3>
            <div className="row">
                <CCard>
                    <CCardHeader>Seleziona da qui il documento in formato excel da caricare</CCardHeader>
                    <CCardBody>
                        <CForm>
                            <CInput className="m-2"
                                type="file"
                                id="nf-file"
                                name="nf-file"
                                placeholder="Seleziona file.."
                                accept={".xlsx,.xls"}
                                onChange ={(e)=>onChangeHandler(e)}
                            />
                            <CButton color="success" className="m-2" onClick={(e)=>readFile(e)} active>
                                Carica
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    )
}

export default FileUpload;