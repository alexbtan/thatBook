"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { set } from 'mongoose';

const Nav = () => {
  const { data : session } =  useSession();

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false)


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/thatbook-highres.png"
          alt="ThatBook Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">ThatBook</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-5 md:gap-5">
            <Link href="/select-book" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href= {`/profile?id=${session?.user.id}`}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ):(
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                types="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown
              ((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href= {`/profile?id=${session?.user.id}`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick = {() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

        ):(
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                types="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
          </>
        )}

      </div>
    </nav>
  )
}

export default Nav