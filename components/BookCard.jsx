'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useSession }  from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const BookCard = ({book, handleBookClick}) => {
    const [img, setImg] = useState("/assets/images/thatbook-highres.png")
    useEffect(() => {
        try {
            setImg(book["volumeInfo"]["imageLinks"]["thumbnail"])
        } catch(error) {
            console.log("Image not found");
        }

        }, [])
  return (
    <div className="bg-white w-[200px] h-[450px] flex-start mx-10">
        <div className="flex-col justify-between items-start gap-5">
            <div className="rounded-md border-2 border-black">
            <Image
                src={img}
                alt="book_image"
                width={200}
                height={160}
                className="rounded-md overflow-auto"
            />
            </div>
            <div className="h-[160px] overflow-auto">
                <h3 className="my-4 font-satoshi font-semibold text-gray-900 cursor-pointer"
                onClick={() => handleBookClick && handleBookClick(book["id"])}>{book["volumeInfo"]["title"]}</h3>
            </div>
        </div>
    </div>
  )
}
export default BookCard