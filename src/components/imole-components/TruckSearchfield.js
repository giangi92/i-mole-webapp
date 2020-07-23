import React,{useState} from 'react';

import SearchField from "react-search-field";
import {CCard, CCardBody, CCardHeader, CButton} from '@coreui/react'
import TypeChecker from 'typeco';

const TruckSearchfield = (props)=>{

    const [itemList, setItemList] = useState(props.elemList);
    const [oldButton, setOldButton] = useState();

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
    const changeColor = (e)=>{
        console.log('elemento cliccato:', e.target);
        if(oldButton){
            oldButton.className="btn btn-info btn-block"
        }
        setOldButton(e.target);
        e.target.className = "btn btn-info-complementary btn-block"
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
                        {itemList ? itemList.map((e, i)=>{
                            console.log(e)
                            return (
                                
                                <li key={i} className="list-padding">
                                    <CButton className="btn btn-info btn-block" onClick={
                                        (btn)=>{
                                                props.getMatch(e.track,e.currentMap)
                                                changeColor(btn)
                                            }
                                         }>
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
    
    