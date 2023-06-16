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

  //const banner = tweet.User.banner;

  return (
    <div className="singleReplyBox">
      <div className="replyMainBody">
        <div className="replyContentBox">
          <img className="userImg" src="" alt="user-img" />
          <div className="replyContent">
            <span className="name">*</span>
            <span className="account">@</span>
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
        <span className="replyCount">{tweet.replyCount}</span>
        <span className="likeCount">{tweet.LikesCount}</span>
      </div>
      <div className="actionBox">
        <span onClick={handleOpenModal}>
          <img src={commentIcon} alt="comment" />
        </span>
        <img src={heartIcon} alt="heart" />
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
