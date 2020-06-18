import React, { Component } from 'react';
import { CButton, CPopover } from '@coreui/react';


const PopoverItem = (props)=> {
    

    return (
        <span>
            <div>
                
                <CPopover header="Popover header" content="Potresti avere un enorme successo!">
                    
                    <CButton className="btn btn-lg btn-danger" color="secondary" onClick={()=>{
                        props.successAlertFunc(!props.showSuccessAlert);
                        }}>
                        {props.item.text}
                    </CButton>
                    {/* <a href="#"> Popover example </a> */}
                </CPopover>
            </div>
        </span>
    );
}

export default PopoverItem;