import {Link, Navigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://blogspot-ahqd.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    // Send logout request to the backend
    fetch('https://blogspot-ahqd.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        // Clear cookies manually in case the server doesn't handle it
        document.cookie.split(";").forEach(cookie => {
          const cookieName = cookie.split("=")[0].trim();
          // Expire the cookie by setting the date to the past
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
  
        // Clear user info from the context
        setUserInfo(null);
  
        // Force reload the page
        window.location.reload(true);
      } else {
        console.error('Logout failed:', response);
      }
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }
  
  

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Blogspot</Link>
      <nav>
        {username && (
          <>
            <Link className="Create-post" to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link  className="Create-post" to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}