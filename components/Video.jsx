import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'

import useDownloadPath from '../hooks/useDownloadPath'

export default function Video({ video, loaded, videoRef, onLoadedData, onVisibleInViewport }) {
  const videoPath = useDownloadPath(video.fileName)

  if (!videoPath) return null

  return (
    <VisibilitySensor
      active={!loaded}
      onChange={onVisibleInViewport}
    >
      {() =>
        <video
          muted
          playsinline
          ref={videoRef}
          onLoadedData={onLoadedData}
          className='absolute z-20 top-0 left-0 h-full'
          width="250"
          preload='none'
          width='100%'
          title={`${video.location}`}
        >
          <source src={videoPath} />
          Sorry, your browser doesn't support embedded videos.
        </video>
      }
    </VisibilitySensor>
  )
}
