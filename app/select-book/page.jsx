'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import BookCard from '/components/BookCard';

const BookCardList = ({ data, handleBookClick}) => {
    return (
      <div className="mt-16 columns-5 space-y-10">
        {data.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleBookClick={handleBookClick}
          />
        ))}
      </div>
    )
  }
const SelectBook = () => {
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState([]);
    const router = useRouter();

    const handleSearchChange = async (e) => {
        setSearchText(e.target.value)
        if(e.target.value != "")
        {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=AIzaSyBqfcll9AA_7H_Eboy-g2EzEe2YTtyOQKs`);
            const data = await response.json();
            setBooks(data.items);
        }
      }


    const handleBookClick = async (e) => {
        console.log(e);
        router.push(`./create-prompt?id=${e}`);
    }

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
      <BookCardList
        data={books}
        handleBookClick={handleBookClick}
      />
    </section>
  )
}

export default SelectBook