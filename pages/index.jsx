import { useState, useEffect, useRef, createRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import VisibilitySensor from 'react-visibility-sensor'

import { getVideos } from './api/getVideos'

export default function Home({ videos }) {
  const [activePreview, setActivePreview] = useState(null)
  const videoRefs = useRef(videos.map(() => createRef()))
  const [videosLoaded, setLoadedVideos] = useState({})

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
    <div className="container px-4 pb-4 motion-safe:animate-fadeIn">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Droneloads – Free drone videos"
        description="HD drone videos. Free to download. No attribution needed."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: 'https://droneloads.com',
          title: 'Droneloads – Free drone videos',
          description: 'HD drone videos. Free to download. No attribution needed.',
          site_name: 'Droneloads',
        }}
        twitter={{
          handle: '@tomchristian91',
          site: 'https://droneloads.com',
          cardType: 'summary_large_image',
        }}
      />
      <main>
        <h2 className='text-center font-normal text-coolGray-300 text-lg md:text-2xl mb-8 md:mb-10'>HD drone videos. Free to download. No attribution needed.</h2>

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
                    <div className='absolute z-0 inset-0 bg-coolGray-800 animate-pulse' />
                    <VisibilitySensor
                      active={videosLoaded[idx] !== true}
                      onChange={() => videoRefs.current[idx].current.load()}
                    >
                      {() =>
                        <video
                          muted
                          ref={videoRefs.current[idx]}
                          onLoadedData={() => setLoadedVideos((current) => ({ ...current, [idx]: true }))}
                          className='absolute z-20 top-0 left-0 h-full'
                          width="250"
                          preload='none'
                          width='100%'
                          title={`${video.location}`}
                        >
                          <source src={video.mediaLink} />
                          Sorry, your browser doesn't support embedded videos.
                        </video>
                      }
                    </VisibilitySensor>
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
        ::selection {
          background: #000; /* WebKit/Blink Browsers */
          color: white;
        }
        ::-moz-selection {
          background: #000; /* Gecko Browsers */
          color: white;
        }
      `}</style>
    </div >
  )
}

export async function getStaticProps(context) {
  const videos = await getVideos()

  return {
    props: {
      videos
    }
  }
}