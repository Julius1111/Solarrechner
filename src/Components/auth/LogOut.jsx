import React from 'react'
import { logoutUser } from "../../config/superbaseClient";
import { useNavigate } from 'react-router-dom';
import './logout.css'

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        let respose; 

        respose = await logoutUser()

        if(respose.success === true)
        {
            navigate('/');
        }
    }

 return (
   
        <div className='logoutContainer'>
            <button className='logoutButton' onClick={handleLogOut}>Logout</button>
        </div>
 )
}

export default LogOut;