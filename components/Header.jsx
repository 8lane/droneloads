import Link from 'next/link'
import Image from 'next/image'

export default function Header({ back = true }) {
  return (
    <header>
      <h1 className="text-4xl flex justify-center my-6 relative">
        {back &&
          <Link href={`/`}>
            <a
              aria-labelledBy='header-back'
              className='absolute left-0 top-0 md:transform md:transition md:hover:scale-125 md:focus:scale-125 md:duration-150'
            >
              <Image
                src={`/images/back.svg`}
                alt='Go back to all drone videos'
                width='47'
                height='23'
              />
              <span id='header-back' className='sr-only'>Go back</span>
            </a>
          </Link>
        }
        <Link href={`/`}>
          <a>
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
    </header>
  )
}
