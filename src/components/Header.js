
import { useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./usercontext";
import { useNavigate } from "react-router-dom";


export default function Header() {
const navigate = useNavigate();
const{setUserInfo,userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
setUserInfo(userInfo);
            });
        });
    }, []);


    function RefreshButton() {
        
          window.location.reload();
       
    }

  function logout(){
    fetch('http://localhost:4000/logout',{
        credentials:'include',
        method:'POST',
    });
    setUserInfo(null);
    navigate('/');

  }

 
const username = userInfo?.username;
 
    return (

        <header>
            <Link to="/" className="logo" >Daily Blogs</Link>
          
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create New post</Link>
                        <a style={{cursor:"pointer"}} onClick={logout}>Logout</a>
                    </>

                )}
                {!username && (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>

                    </>
                )}
            </nav>

        </header>


    );
}
