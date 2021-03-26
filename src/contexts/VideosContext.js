import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const VideoContext = React.createContext()

export function useVideo() {
  return useContext(VideoContext)
}

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     console.log('user', user)
  //     setCurrentUser(user)
  //     setLoading(false)
  //   })

  //   return unsubscribe
  // }, [])

  const value = {
    videos
  }

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
}
