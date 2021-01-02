import { useEffect, useState } from 'react'

export default function useDownloadPath(fileName) {
  const [downloadPath, setDownloadPath] = useState(null)

  useEffect(() => {
    const getVideoPath = async () => {
      const req = await await window.fetch(`/api/getVideoDownload?file=${encodeURI(fileName)}`)
      const res = await req.json()
      setDownloadPath(res.url)
    }

    getVideoPath()
  }, [])

  return downloadPath
}