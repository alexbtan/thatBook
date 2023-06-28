'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useSession }  from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleUserClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [bookName, setBookName] = useState("");
  const [bookImage, setBookImage] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  //Fetches the post information from the database
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/books/${post.title}`);
      const data = await response.json();
      setBookName(data["volumeInfo"]["title"]);
      setBookImage(data["volumeInfo"]["imageLinks"]["thumbnail"]);
    }

    fetchPosts();
  }, [])

  return (
    <div className="prompt_card bg-[url('/assets/images/bookSpine.png')] bg-no-repeat bg-contain">
      <div className="ml-12">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900"
                onClick={() => handleUserClick && handleUserClick(post.creator._id)}
              >{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            alt="copy"
            width={12}
            height={12}
            />
          </div>
          <div className="rounded-md -my-20 border-2 border-black">
          <Image
              src={bookImage}
              alt="book_image"
              width={80}
              height={160}
              className="rounded-md object-contain"
            />
          </div>
        </div>
        <div className="h-[160px] overflow-auto">
          <h3 className="my-4 font-satoshi font-semibold text-gray-900">{bookName}</h3>
          <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
          <p 
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >{post.tag}</p>
          {pathName === '/profile' && session?.user && session?.user.id === post.creator._id && (
            // && session?.user && session?.user.id === post.creator.id 
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </p>
              <p 
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromptCard