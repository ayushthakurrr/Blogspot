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

  function logout(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
  
    fetch('https://blogspot-ahqd.onrender.com/logout', {
      credentials: 'include', // Include cookies in the request
      method: 'POST',
    })
    .then((response) => {
      if (response.ok) {
        // Clear cookies in the browser
        document.cookie.split(";").forEach(cookie => {
          const cookieName = cookie.split("=")[0].trim();
          // Expire the cookie by setting the date to the past
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
  
        // Clear user info from the context
        setUserInfo(null);
  
        // Optionally redirect the user to a different page or show a message
        // e.g., history.push('/login');
  
        // Force reload the page to reflect the logged-out state
        window.location.reload();
      } else {
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch((error) => {
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