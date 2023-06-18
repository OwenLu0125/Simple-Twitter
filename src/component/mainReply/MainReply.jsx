import profileImg from '../../assets/img/canadian-girl.jpg';
import commentIcon from '../../assets/commit.svg';
import emptyHeart from '../../assets/heart.svg';
import fullHeart from '../../assets/like-heart.svg';
import PopupReply from '../popupReply/PopupReply';
import React, { useState } from 'react';
import { unlikeTweet, likeTweet } from '../../api/likeAndUnlike';
import './MainReply.scss';

const MainReply = ({ tweet, repliesSet, tweetSet, setTweet }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    try {
      (await tweet.isLiked) ? unlikeTweet(tweet.id) : likeTweet(tweet.id);
      setTweet((prev) => {
        return {
          ...prev,
          tweetLikeCount: prev.isLiked
            ? prev.tweetLikeCount - 1
            : prev.tweetLikeCount + 1,
          isLiked: !prev.isLiked,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="singleReplyBox">
      <div className="replyMainBody">
        <div className="replyContentBox">
          <img
            className="userImg"
            src={tweet.tweetOwnerAvatar}
            alt="user-img"
          />
          <div className="replyContent">
            <span className="name">{tweet.tweetOwnerName}</span>
            <span className="account">@{tweet.tweetOwnerAccount}</span>
          </div>
        </div>
        <div className="content">{tweet.description}</div>
        <div className="timestamp">
          <p>{tweet.updatedAt}</p>
          <span className="dot"></span>
          <p>{tweet.updatedAt}</p>
        </div>
      </div>
      <div className="countBox">
        <span className="replyCount">{tweet.tweetReplyCount}</span>
        <span className="likeCount">{tweet.tweetLikeCount}</span>
      </div>
      <div className="actionBox">
        <span onClick={handleOpenModal}>
          <img src={commentIcon} alt="comment" />
        </span>
        <img
          src={tweet.isLiked ? fullHeart : emptyHeart}
          alt="heart"
          onClick={handleLike}
        />
      </div>
      {showModal && (
        <PopupReply
          open={showModal}
          onClose={handleCloseModal}
          repliesSet={repliesSet}
          tweetSet={tweetSet}
          tweet={tweet}
        />
      )}
    </div>
  );
};

export default MainReply;
