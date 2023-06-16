import React, { useState } from 'react';
import { likeTweet, unlikeTweet } from '../../../api/likeAndUnlike';
import commitIcon from '../../../assets/commit.svg';
import heartIcon from '../../../assets/heart.svg';
import './Tweet.scss';
import { useId } from '../../../contexts/IdContext';
import { useNavigate } from 'react-router-dom';

const Tweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  tweetId,
  likes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likes);
  const { checkItemId } = useId();
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (isLiked && count === 0) {
        return;
      }
      if (isLiked) {
        await unlikeTweet(tweetId);
        setCount((prevLikes) => prevLikes - 1);
      } else {
        await likeTweet(tweetId);
        setCount((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.error('喜歡推文失败:', error);
    }
    setIsLiked(!isLiked);
  };
  return (
    <>
      <div className="tweetContainer">
        <img src={logo} alt="Logo" className="userLogo" />
        <div className="tweetContent">
          <div className="tweetHeader">
            <span className="tweetUsername">{username}</span>

            <span className="tweetAccountName">@{accountName}</span>
            <span className="dot" />
            <span className="tweetPostTime">{postTime}</span>
          </div>
          <div
            className="tweetText"
            onClick={() => {
              checkItemId(tweetId);
              navigate('/reply_list');
            }}
          >
            {content}
          </div>
          <div className="tweetFooter">
            <div className="tweetComments">
              <img src={commitIcon} alt="commit icon" />
              <span className="commentCount">{comments}</span>
            </div>
            <div className="tweetLikes" onClick={handleLike}>
              <img
                src={heartIcon}
                alt="heart icon"
                className={`heartIcon ${isLiked ? 'liked' : ''}`}
              />
              <span className="likeCount">{count}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Tweet;
