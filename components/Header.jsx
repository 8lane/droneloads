import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const showBack = router.pathname !== '/'

  return (
    <header className="container px-4 pb-4 motion-safe:animate-fadeIn">
      <div className='mt-8 mb-8 sm:mt-11 sm:mb-9 px-3 md:px-0 md:mx-auto'>
        <h1 className="text-4xl flex justify-center relative">
          {showBack &&
            <Link href={`/`}>
              <a
                aria-labelledby='header-back'
                className='w-12 h-12 flex justify-center absolute -left-3 -top-4 sm:-top-2 md:transform md:transition md:hover:scale-125 md:focus:scale-125 md:duration-150 motion-safe:animate-fadeIn'
              >
                <div className='w-6 flex items-center'>
                  <Image
                    src={`/images/back.svg`}
                    alt='Go back to all drone videos'
                    width='47'
                    height='23'
                  />
                </div>
                <span id='header-back' className='sr-only'>Go back</span>
              </a>
            </Link>
          }
          <Link href={`/`}>
            <a className='flex w-40 sm:w-72 md:w-80 text-center'>
              <Image
                src={`/images/logo.svg`}
                alt=''
                width='324'
                height='36'
              />
              <span className='sr-only'>Droneloads</span>
            </a>
          </Link>
        </h1>
      </div>
    </header>
  )
}
