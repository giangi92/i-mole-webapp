import React from 'react';
import { Redirect } from 'react-router';
import jwt from 'jsonwebtoken';

const TokenCheckerRedirect = (redirectLocation) => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
        try {

            const isCorrect = jwt.verify(sessionToken, 'secret')
            console.log("verifica del token:", isCorrect);
            if (isCorrect) {
                return (
                    <div>
                        <Redirect to={'/' + redirectLocation.uri} />
                    </div>
                )
            }
        } catch (error) {
            console.log('errore nella verifica token:', error);
            return (
                <div>
                    <Redirect to="/" />
                </div>
            )
        }
    }else{
        console.log('Nessun token');
        
        return (
            <div>
                <Redirect to="/loginUser" />
            </div>
        )
    }    
}

const TokenChecker = () => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
        try {
            
            const isCorrect = jwt.verify(sessionToken, 'secret',(err, decoded)=>{
                console.log('controllo del token, errore?',err);
                
                if(err)return false 
                else return true;

            })
            console.log("verifica del token:", isCorrect);
            return isCorrect
        } catch (error) {
            // console.log('errore nella verifica token:', error);
            return false;
        }
    }
    return false;
}

const TokenCheckerSetState = (state) => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
        try {
            
            const isCorrect = jwt.verify(sessionToken, 'secret',(err, decoded)=>{
                console.log('controllo del token, errore?',err);
                
                if(err)state.setLogged(false) 
                else state.setLogged(true)

                return;

            })
            
        } catch (error) {
            // console.log('errore nella verifica token:', error);
            state.setLogged(false)
        }
    }
    state.setLogged(false)
}

export { TokenChecker, TokenCheckerSetState, TokenCheckerRedirect as default };