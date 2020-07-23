import React,{useState} from 'react';

import SearchField from "react-search-field";
import {CCard, CCardBody, CCardHeader, CButton} from '@coreui/react'
import TypeChecker from 'typeco';

const TruckSearchfield = (props)=>{

    const [itemList, setItemList] = useState(props.elemList);

    // useEffect(()=>{
    //     setItemList(props.elemList)
    // },[itemList])

    const getMatchedList = (searchText) => {
        if (TypeChecker.isEmpty(searchText)) return props.elemList;
        return props.elemList.filter(item => item.id.toLowerCase().includes(searchText.toLowerCase()));
      };
    const onChange = (value)=>{
        const filteredList = getMatchedList(value);
        console.log(filteredList);
        setItemList(filteredList)
    }
    return (
        <div>
            <CCard style={{ width:"300px"}}>
                <CCardHeader>
                    <SearchField
                        placeholder="Cerca..."
                        onChange= {onChange}
                        searchText=""
                        classNames="search-bar"
                        autosize={false}    
                    />
                </CCardHeader>
                <CCardBody className="fixed-height">
                    <ul>
                        {itemList ? itemList.map((e, id)=>{
                            console.log(e)
                            return (
                                
                                <li key={e.id} className="list-padding">
                                    <CButton className="btn btn-info btn-block" onClick={()=>props.getMatch(e.track,e.currentMap)}>
                                        {e.id}
                                    </CButton>
                                </li>
                            )
                        }) : <div>Nessun elemento</div>}
                    </ul>
                </CCardBody>
            </CCard>
            
        </div>
        )
    }

export default TruckSearchfield
    
    