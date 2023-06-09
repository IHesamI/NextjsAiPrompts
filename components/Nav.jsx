'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth';
export default function Nav() {
  const islogged = true;
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    const setProvidersfunc = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setProvidersfunc()

  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href={'/'}
        className="flex gap-2 flex-center">
        <Image
          src={'/assets/images/logo.svg'}
          alt={'Promptopia logo'}
          width={30}
          height={30}
        />
        <p className="logo_text"> Promptopia </p>
      </Link>

      {/*  */}
      <div
        className="sm:flex hidden">
        {
          islogged ?
            <div
              className="flex gap-3 md:gap-5">
              <Link
                href={'/create-prompt'}
                className="black_btn">
                Create Prompt
              </Link>
              <button
                type='button'
                onClick={signOut}
                className="outline_btn">
                Sign out
              </button>
              <Link
                href={'/profile'}>
                <Image
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt={'profile'}
                  src={'/assets/images/logo.svg'}
                />

              </Link>

            </div>
            :
            <>
              {providers && Object.values(providers).map(provider => (
                <button
                  type={'button'}
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">


                </button>
              ))}
            </>
        }
      </div>

    </nav>
  )
}
