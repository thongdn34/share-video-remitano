import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import VideoDataService from "../services/videos";
import { getId, getInfoFromAUrl } from "../utils/youtube";

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
      const id = getId(url);
      const data = await getInfoFromAUrl(url);
      const video = {
        title: data?.items[0].snippet.title,
        shareBy: currentUser?.email,
        like: 0,
        dislike: 0,
        description: data?.items[0].snippet.title,
        src: `https://www.youtube.com/embed/${id}`
      };
      await VideoDataService.create(video);
      setUrl("");
      alert("Thanks for sharing");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <p>Share your Youtube video here</p>
      <input
        placeholder="Youtube url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => onClickShare()}>Share</button>
    </div>
  );
};

export default ShareVideo;
