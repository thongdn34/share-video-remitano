import React, { useContext, useState } from "react";
import VideoDataService from "../services/videos";

const VideoContext = React.createContext();

export function useVideo() {
  return useContext(VideoContext);
}

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideos = async () => {
    setLoading(true)
    const data = await (await VideoDataService.getAll()).val();
    setVideos(data)
    setLoading(false)
  }

  const value = {
    loading,
    videos,
    setVideos,
    getVideos
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}
