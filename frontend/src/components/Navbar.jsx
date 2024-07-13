import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate= useNavigate()
    var role = localStorage.getItem('role');
    
    const logoutfn=()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
  return (
    <>
    <div className='h-16 w-full bg-black text-white flex justify-between font-thin'>
        <div className='content-center pl-5'>
            TODO-TEST
        </div>
        <div className="content-center">
            <h2>Login : {role}</h2>
        </div>
        <div className=' content-center pr-5'>
            <button onClick={logoutfn}>
                LOGOUT
            </button>
        </div>
 
    </div>
    </>
    
  )
}

export default Navbar