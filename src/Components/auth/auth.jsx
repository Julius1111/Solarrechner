import React, { useState, useRef } from "react";
import "./auth.css"

import { loginUser, registerUser } from "../../config/superbaseClient";


const Auth = () => {
    
    const login = "Login"
    const singUp = "Singup"

    const [loginSingup, setLoginSingup] = useState(singUp);
    const [currend, setCurrend] = useState(login);
    const [error, setError] = useState(null);

    const togel =() =>{
        if(loginSingup === login)
        {
            setLoginSingup(singUp)
            setCurrend(login)
        }
        else {
            setLoginSingup(login)
            setCurrend(singUp)
        }
    }


    const passwortRef = useRef(null);
    const emailRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const email = emailRef.current.value;
        const passwort = passwortRef.current.value;

        if(currend === login)
        {
            setError(loginUser(email, passwort))
        }
        else{
            setError(registerUser(email, passwort))
        }

        // fehler bei Registrierung
        if(error)
        {
            return
        }


    };

    return (
    <div className="authContainer containerInput">

        <h1>{currend}</h1>

        <form onSubmit={handleSubmit}>
            
            <label htmlFor="email">E-Mail:</label>
            <input
                type="email"
                id="email"
                ref={emailRef}
                required
            />

            <label htmlFor="passwort">Passwort:</label>
            <input
                type="passwort"
                id="passwort"
                ref={passwortRef}
                required
            />
            
            <div className="authContainerButton">
                <button className="customButton" type="submit">Absenden</button> 
            </div>
        </form>

        
        <button className="switchButton" onClick={togel}>{"Go to " + loginSingup}</button>
        
    </div>
    
    );
}

export default Auth;