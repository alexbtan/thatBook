'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from '@components/profile'

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  //Fetches the post information from the database
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${promptId}/posts`);
      const data = await response.json();

      const response2 = await fetch(`/api/users/${promptId}`)
      const data2 = await response2.json();
      setUser(data2[0]["username"]);
      setPosts(data);
    }

    if(promptId) fetchPosts();
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed)
    {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Profile
      name={user}
      desc="View all of their posts"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile 