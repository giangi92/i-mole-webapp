import React, {useState} from 'react';
import {CForm, CCard, CCardHeader, CCardBody, CInput, CButton, CAlert} from '@coreui/react'

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const FileUpload = () => {

    const [file, setFile] = useState({});
    const [key, setKey] = useState(0);
    const [showFileErrorMess, setShowFileErrorMess] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const [showSuccessMess, setShowSuccessMess] = useState(false)

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("file caricato:", e.target.files[0]);
        const targetFile = e.target.files[0];
        if(targetFile.type.includes('.xlsx') || targetFile.type.includes('.xls') || targetFile.type.includes('openxmlformats')){
            setShowFileErrorMess(false);
            setFile(targetFile)
        }else{
            //MOSTRA MESSAGGIO FORMATO FILE NON CORRETTO
            setShowFileErrorMess(true);
        }
    }
    
    const readFile = (e) => {
        if(file){

            const data = new FormData() 
            data.append('file', file)
            
            setShowLoading(true);

            fetch('/imole/fileUpload', {
                method: 'POST',
                body: data
            }).then(response => response.json()).then((resp)=>{
                setShowLoading(false);
                if(resp.error){
                    //MESSAGGIO ERRORE CARICAMENTO
                    setShowFileErrorMess(false);
                }else if(resp.message === "NOT_AUTENTICATED"){
                    //MOSTRA MESSAGGIO, ERRORE UTENTE
                }else if(resp.message === "NOT_VALID"){
                    //MOSTRA MESSAGGIO FILE NON VALIDO 
                }else{
                    //TUTTO OK ;)
                    setKey(Math.random())
                    setShowSuccessMess(true)
                }
            })
        }else{
            //MOSTRA MESSAGGIO SELEZIONA FILE
            setShowFileErrorMess(true);
        }
        
    }

    return (
        <div>
            {showLoading && loading}
            <h3>Carica il file da salvare in cloud</h3>
            <div className="row">
                <CCard>
                    <CCardHeader>Seleziona da qui il documento in formato excel da caricare</CCardHeader>
                    <CCardBody>
                    {showFileErrorMess && 
                        <CAlert color="info" closeButton fade>
                            Tipo file non valido, ammessi file di tipo xlsx, xls.
                        </CAlert>}
                        {showSuccessMess && 
                        <CAlert color="info" closeButton fade>
                            File caricato correttamente
                        </CAlert>}
                        <CForm>
                            <CInput className="m-2"
                                type="file"
                                id="nf-file"
                                name="nf-file"
                                placeholder="Seleziona file.."
                                accept={".xlsx,.xls"}
                                onChange ={(e)=>onChangeHandler(e)}
                                key = {key}
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