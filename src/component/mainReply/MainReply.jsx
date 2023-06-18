import profileImg from '../../assets/img/canadian-girl.jpg';
import commentIcon from '../../assets/commit.svg';
import heartIcon from '../../assets/heart.svg';
import PopupReply from '../popupReply/PopupReply';
import React, { useState } from 'react';
import './MainReply.scss';

const replyData = {
  img: profileImg,
  username: 'John Doe',
  accountName: '@johndoe',
  postTime: '上午10:05',
  postDate: '2021年11月10日',
  content:
    'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
  replyNum: '34',
  likeNum: '808',
};

const MainReply = ({ tweet, repliesSet, tweetSet }) => {
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
