'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, handleUserClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  //On user click
  const handleUserClick = async (e) => {
    router.push(`/profile?id=${e}`)
  }

  //On tag click
  const handleTagClick = async (e) => {
    console.log(e);
    const response = await fetch('/api/prompt');
    const data = await response.json();
    var good = [];
    let i = 0;
    while(i < data.length)
    {
      if(data[i]["tag"].includes(e))
      {
        good.push(data[i]);
      }
      i++;
    }
    setPosts(good);
  }
  //On input to search bar
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value)
    const response = await fetch('/api/prompt');
    const data = await response.json();
    var good = [];
    let i = 0;
    while(i < data.length)
    {
      if(JSON.stringify(data[i]).includes(e.target.value))
      {
        good.push(data[i]);
      }
      i++;
    }
    setPosts(good);
  }

  //Fetches the post information from the database
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
    
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        handleUserClick={handleUserClick}
      />
    </section>
  )
}

export default Feed