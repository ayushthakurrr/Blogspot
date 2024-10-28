import {Link, Navigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    if (userInfo) { // Only fetch if userInfo is available
      fetch('https://blogspot-ahqd.onrender.com/profile', {
        credentials: 'include',
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setUserInfo(null); // Clear userInfo if not authenticated
          throw new Error('Failed to fetch user profile');
        }
      })
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setUserInfo(null); // Clear user info on error
      });
    }
  }, [userInfo, setUserInfo]); // Runs when userInfo changes
  
  console.log('Cookies after logout:', document.cookie);

  function logout() {
    fetch('https://blogspot-ahqd.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        // Clear user info only after confirming logout success
        setUserInfo(null); 
        localStorage.removeItem('token'); // Remove specific item from local storage
        sessionStorage.clear(); // Clear all session storage
        window.location.reload(true); // Reload page
      } else {
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch(error => {
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