/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useVideo } from "../../contexts/VideosContext";
import VideoDataService from "../../services/videos";
import "./style.scss";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { videos, loading, getVideos, setVideos } = useVideo();
  const ACTIONS = {
    LIKE: "reactLike",
    UNLIKE: "reactDislike"
  };

  useEffect(() => {
    getVideos();
  }, []);

  const onClickReact = async (key, action, reacted = false) => {
    if (!currentUser) {
      alert("Please login to do reaction");
      return;
    }
    const item = videos?.[key];
    const isLike = action === ACTIONS.LIKE;
    const fieldUpdate = isLike ? "like" : "dislike";
    let listReaction = item?.[action] || [];

    if (reacted) {
      listReaction = listReaction.filter((i) => i !== currentUser.email);
    } else {
      listReaction = [...listReaction, currentUser.email];
    }

    try {
      await VideoDataService.update(key, {
        ...item,
        [action]: listReaction,
        [fieldUpdate]: listReaction.length
      });

      setVideos({
        ...videos,
        [key]: {
          ...item,
          [action]: listReaction,
          [fieldUpdate]: listReaction.length
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderItem = (key) => {
    const item = videos?.[key];
    const isLikeByCurrentUser = item?.reactLike?.includes(currentUser?.email);
    const isDislikeByCurrentUser = item?.reactDislike?.includes(
      currentUser?.email
    );
    return (
      <div className="dashboard__block-item block row" key={item?.title}>
        <div className="col-6">
          <iframe
            title={item?.title}
            src={item?.src}
            width="100%"
            height="400"
            allowFullScreen={true}
          ></iframe>
        </div>
        <div className="col-6">
          <div className="dashboard__block-info block">
            <h2>{item?.title}</h2>
            <div className="dashboard__block-title d-flex align-items-center">
              <p className="share-by">Share by {item?.shareBy}</p>
              {!isLikeByCurrentUser && !isDislikeByCurrentUser ? (
                <div>
                  <span
                    className="big-reaction like-light"
                    onClick={() => onClickReact(key, ACTIONS.LIKE)}
                  ></span>
                  <span
                    className="big-reaction like-light flip"
                    onClick={() => onClickReact(key, ACTIONS.UNLIKE)}
                  ></span>
                </div>
              ) : isLikeByCurrentUser ? (
                <span
                  className="big-reaction liked"
                  onClick={() => onClickReact(key, ACTIONS.LIKE, true)}
                ></span>
              ) : (
                <span
                  className="big-reaction liked flip"
                  onClick={() => onClickReact(key, ACTIONS.UNLIKE, true)}
                ></span>
              )}
            </div>

            <div className="dashboard__rate d-flex">
              <div className="like">
                <span>{item?.like}</span>
                <span className="reaction like-light"></span>
              </div>
              <div className="dislike">
                <span>{item?.dislike}</span>
                <span className="reaction like-light flip"></span>
              </div>
            </div>

            <div className="dashboard__description">
              <h4>Description:</h4>
              <p>{item?.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading.......</div>;
  }

  return (
    <div className="dashboard">
      {videos ? (
        Object.keys(videos)?.map((key) => renderItem(key))
      ) : (
        <div>No video here. Share video to make it funny</div>
      )}
    </div>
  );
};

export default Dashboard;
