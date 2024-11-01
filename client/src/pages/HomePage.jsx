import { useEffect, useState } from "react"
import Post from "../components/Post"

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch('https://blogspot-ahqd.onrender.com/post')
      const posts  = await response.json()
      setPosts(posts)
      setLoading(false)
    }
    fetchData();
  },[]) 


  if(loading){
    return <div className="loader-parent">
      <div className="loader-container">
      <span className="loader">
      </span>
      <div>
        Server is setting up 
      </div>
      </div>
    </div>
  }

  return (
    <>
    {posts.length > 0 && posts.map(post => (
      <Post {...post}/>
    ))}
    </>
  )
}

export default HomePage