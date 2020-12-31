import { useState, useEffect, useRef, createRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Header from '../components/Header'
import { list } from './api/list'

export default function Home({ videos }) {
  const [activePreview, setActivePreview] = useState(null)
  const videoRefs = useRef(videos.map(() => createRef()))

  const handleMouseOver = (idx) => {
    setActivePreview(idx)
  }

  const handleMouseOut = () => {
    if (typeof activePreview === 'number') {
      videoRefs.current[activePreview].current.pause()
      videoRefs.current[activePreview].current.currentTime = 0
    }

    setActivePreview(null)
  }

  useEffect(() => {
    if (typeof activePreview === 'number') {
      videoRefs.current[activePreview].current.play()
    }
  }, [activePreview])

  return (
    <div className="container px-4 pb-4 md:px-0">
      <Head>
        <title>Droneloads</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header back={false} />

        <h2 className='text-center font-normal text-coolGray-300 text-2xl mb-10'>HD drone videos. Free to download. No attribution needed.</h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
          {videos.map((video, idx) => {
            return (
              <li
                onMouseOver={() => handleMouseOver(idx)}
                onMouseOut={handleMouseOut}
                key={video.id}
                className='shadow-2xl'
              >
                <Link href={`/video/${video.name}`}>
                  <a className='link relative block w-full hover:shadow-xl md:transform md:transition md:duration-200 md:hover:scale-110 md:hover:z-30 md:focus:scale-110'>
                    <Image
                      src={`/images/thumbnails/${video.name}.jpg`}
                      alt={video.name}
                      className='z-10'
                      layout='fill'
                      objectFit='cover'
                    />
                    <div className='absolute z-0 inset-0 bg-coolGray-800 animate-pulse' />
                    <video
                      muted
                      ref={videoRefs.current[idx]}
                      className='absolute z-20 top-0 left-0 h-full'
                      width="250"
                      preload='metadata'
                      width='100%'
                    >
                      <source src={video.mediaLink} />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>

      <style jsx>{`
        .link {
          padding-top: 56.33%;
        }
      `}</style>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

    </div>
  )
}

export async function getStaticProps(context) {
  const videos = await list()

  // if (!media) {
  //   return {
  //     media,
  //   }
  // }

  return {
    props: {
      videos
    }, // will be passed to the page component as props
  }
}