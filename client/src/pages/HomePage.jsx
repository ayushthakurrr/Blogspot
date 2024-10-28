import { useEffect, useState } from "react"
import Post from "../components/Post"

function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    fetch('https://blogspot-ahqd.onrender.com/post').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  },[])

  return (
    <>
    {posts.length > 0 && posts.map(post => (
      <Post {...post}/>
    ))}
    </>
  )
}

export default HomePage