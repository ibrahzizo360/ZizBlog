import {useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/Context";
import {toast} from 'react-toastify';

export default function Header(){
  const {setUserInfo, userInfo} = useContext(UserContext);
  
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      }) 
    })
  },[setUserInfo])

  

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
    toast("See You !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const username = userInfo?.username;
    return(
        <header>
        <Link to= "/" className="logo">ZizoBlog</Link>
        <nav>
          {username && (
            <>
              <Link to ='/create'>Create new post</Link>
              <Link to ='/' onClick={logout}>Logout</Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    )
}