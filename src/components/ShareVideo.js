import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import VideoDataService from "../services/videos";
import { getInfoFromAUrl } from "../utils/youtube";

const ShareVideo = () => {
  const { currentUser } = useAuth();
  const [url, setUrl] = useState("");

  const onClickShare = async () => {
    if (!currentUser) {
      setUrl("");
      alert("Please login to share video");
      return;
    }

    try {
      const data = await getInfoFromAUrl(url);
      console.log(("data", data));
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClickTestUpDatabase = async () => {
    const data = {
      title: 'sdfsdf',
      description: 'sdfsdfsdf',
      published: false
    };

    try {
      const res = await VideoDataService.create(data)
      console.log('resss', res)
    } catch (error) {
      console.log('error', error)
    }

  }
  return (
    <div>
      <p>Share your Youtube video here</p>
      <input
        placeholder="Youtube url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => onClickShare()}>Share</button>
      <button onClick={() => onClickTestUpDatabase()}>Up</button>
    </div>
  );
};

export default ShareVideo;
