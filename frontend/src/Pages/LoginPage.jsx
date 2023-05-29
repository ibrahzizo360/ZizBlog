import { useState,useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../Contexts/Context";
import {toast} from 'react-toastify';

export default function LoginPage(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include',
        })
        console.log(response)
        if (response.status !== 200){
            toast.error('login failed');
        }
        else {
            
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
            setRedirect(true);
            toast.success('login successful');
        }
    };

    if (redirect){
       return <Navigate to={'/'}/>
    }

    return(
            <form className="login">
                <h1>login</h1>
                <input type="text" 
                    placeholder="username"
                    value={username}
                    onChange={ev => setUserName(ev.target.value)}
                 />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button onClick={login}>Login</button>
            </form>
    )
}
