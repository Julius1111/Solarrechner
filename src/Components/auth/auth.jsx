import React, { useState, useRef } from "react";
import "./auth.css"
import { useNavigate } from 'react-router-dom';

import supabase, { loginUser, registerUser } from "../../config/superbaseClient";


const Auth = () => {
    
    const navigate = useNavigate();

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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const email = emailRef.current.value;
        const passwort = passwortRef.current.value;
        let response;

        try{
            if(currend === login)
            {
                response = await loginUser(email, passwort)
            }
            else{
                response = await registerUser(email, passwort)
            }


            // fehler bei Registrierung 
            if(response.error)
            {
                setError(response.error.message)
                console.log(response.error.message);  
            } else 
            {   
                
                // weiter zu rechner
                navigate('/rechner');
            }
        }
        catch (err){
            setError(err);
        }
    };

    const handelAnonymLogin = async () => {
        try {
            // Anonymen Benutzer anmelden
            const { error } = await supabase.auth.signInAnonymously();
    
            if (error) {
                console.error("Fehler beim anonymen Login:", error.message);
                return;
            }
    
            navigate('/rechner')
        } catch (error) {
            console.error("Ein Fehler ist aufgetreten:", error.message);
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

            <label htmlFor="password">Passwort:</label>
            <input
                type="password"
                id="passwort"
                ref={passwortRef}
                required
            />
            
            <div className="authContainerButton">
                <button className="customButton" type="submit">Absenden</button> 
            </div>
        </form>

        
        <button className="switchButton" onClick={togel}>{"Go to " + loginSingup}</button>

        <button className="switchButton" onClick={handelAnonymLogin}> weiter als Gast </button>
        
        {error != null &&
            <p className="errorMessage"> {error}</p>
        }

    </div>
    
    );
}

export default Auth;