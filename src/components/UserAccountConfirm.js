import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const UserAccountConfirm = ({match}) => {
    const [showExpiredAlert, setShowExpiredAlert] = useState(false);
    useEffect(()=>{
        fetch("/user/confirm/"+match.params.token,
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
              if (data.error) {
                console.log('Errore: ' + data.error.message)
              } else {
      
                console.log(data);
                if(data.tokenStatus === 'EXPIRED'){
                  setShowExpiredAlert(true)
                }              
              }
            })
      },[])

    return (
        <div className="flex-row align-items-center">
            {showExpiredAlert?
            <div>
                <h2>Link scaduto</h2>
                <p>Se non hai già confermato il tuo account non sarà più possibile accedere alla piattaforma I-Mole</p>
            </div>
            :
            <div>
                <h2>Account confermato!</h2>
                <p>Il tuo account è stato convalidato. <Link to="/">Puoi tornare alla piattaforma</Link></p>
            </div>    
        }
        </div>
    )
}

export default UserAccountConfirm;