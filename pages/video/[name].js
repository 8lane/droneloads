import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import QRCode from 'qrcode'

import Header from '../../components/Header'
import { list } from '../api/list'

const Post = ({ video, donate }) => {
  const [donateActive, setDonateActive] = useState(false)
  const router = useRouter()
  const { name } = router.query

  return (
    <div className="container">
      <Header />

      <div className='flex justify-center'>
        <div className='max-w-3xl'>
          <video controls className='shadow-2xl' width="250" preload='metadata' width='100%'>
            <source src={video.mediaLink} />
              Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
      </div>

      <div className='max-w-sm my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 text-center '>
          <div>
            <h3 className='text-xl'>Download free</h3>
            <Link href={video.mediaLink}>
              <a className='inline-block h-10 px-6 py-3 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-90 hover:bg-indigo-800'>Download</a>
            </Link>
          </div>
          <div>
            <h3 className='text-xl'>Pay what you want</h3>
            <button
              type='button'
              onClick={() => setDonateActive(true)}
              className='inline-block h-10 px-6 py-3 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-90 hover:bg-indigo-800'
            >
              Donate
            </button>
          </div>
        </div>

        {donateActive &&
          <div>
            <img src={donate.bitcoinQR} alt='Donate with Bitcoin' width='100' />
          </div>
        }
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const videos = await list()

  const paths = videos.map((video) => ({
    params: { name: video.name },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const videos = await list()

  const generateQR = async text => {
    try {
      return await QRCode.toDataURL(text, {
        margin: 0,
        color: {
          dark: '#FFF',  // Blue dots
          light: '#0E0E0E' // Transparent background
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const donate = {
    bitcoinQR: await generateQR('hi')
  }

  const video = videos.find((video) => video.name === params.name)

  return { props: { video, donate } }
}

export default Post
