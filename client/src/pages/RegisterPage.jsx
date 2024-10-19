import { Link, Navigate } from "react-router-dom"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const success = () => toast.success("Registration successful");
  const failed = () => toast.error("Registration failed");

 
  async function register(e){
    e.preventDefault();
    const response = await fetch('http://localhost:4000/register',{
      method: 'POST',
      body: JSON.stringify({username,password,email}),
      headers: {'Content-Type' : 'application/json'}
    })
    if(response.status === 200){
      success()
      return <Navigate to={'/'} />
      
    }else{
      failed()
    }
  }
  return (
    <div>
      
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
              type="text"
              placeholder="Username"
              value={username} 
              onChange={e => setUsername(e.target.value)}
             />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="E-mail address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <button className="btn">Register</button>
            <div className="adons">
                Already have an account? 
                <Link to={'/login'}>Login</Link>

            </div>
            
        </form>
        
    </div>
  )
}

export default RegisterPage