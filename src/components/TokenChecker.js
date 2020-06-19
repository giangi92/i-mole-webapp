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
                <Redirect to="/" />
            </div>
        )
    }    
}

const TokenChecker = () => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
        try {

            const isCorrect = jwt.verify(sessionToken, 'secret')
            console.log("verifica del token:", isCorrect);
            if (isCorrect) {
                return true
            }
        } catch (error) {
            console.log('errore nella verifica token:', error);
            return false;
        }
    }
    return false;
}

export { TokenChecker, TokenCheckerRedirect as default };