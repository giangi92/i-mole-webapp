import React from 'react';
import { CModal, CModalBody } from '@coreui/react'

const LoadingPopup = (toggle) => {
    return (
        <div className="animated fadeIn">
            <CModal className="modal-info" isOpen={toggle.show} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <CModalBody>
                    Loading...
                </CModalBody>
            </CModal>
        </div>
    )
}

export default LoadingPopup;