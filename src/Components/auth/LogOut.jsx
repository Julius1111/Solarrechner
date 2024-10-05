import React from 'react'
import { logoutUser } from "../../config/superbaseClient";
import { useNavigate } from 'react-router-dom';

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
    <div>
        <button className='customButton' onClick={handleLogOut}>Logout</button>
    </div>
 )
}

export default LogOut;