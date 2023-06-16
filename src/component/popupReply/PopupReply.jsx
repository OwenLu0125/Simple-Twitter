import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '../../assets/closeIcon.svg';
import profileImg from '../../assets/img/canadian-girl.jpg';
import { postReply } from '../../api/tweets';
import { useId } from '../../contexts/IdContext';
import { useAuth } from '../../contexts/AuthContext';
import './PopupReply.scss';

const PopupReply = ({ open, onClose, tweet, repliesSet, tweetSet }) => {
  const [replyMsg, setReplyMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { currentId } = useId();
  const { currentMember } = useAuth();

  const handleTweetTextChange = ({ target: { value } }) => {
    setReplyMsg(value);
  };

  const handlePopupClose = () => {
    setReplyMsg('');
    onClose();
  };

  const handleTweet = async () => {
    if (replyMsg.length === 0) {
      setErrorMessage('內容不可空白');
      return;
    }
    try {
      const response = await postReply({ id: currentId, comment: replyMsg });
      console.log('推文已發布:', response);

      setReplyMsg('');
      setErrorMessage('');

      onClose();

      repliesSet((prev) => {
        return [
          ...prev,
          {
            ...response.data,
            User: { ...currentMember },
          },
        ];
      });

      tweetSet((prev) => {
        return { ...prev, replyCount: prev.replyCount + 1 };
      });

      //window.location.reload(); //可在優化
    } catch (error) {
      console.error('發佈推文失败:', error);
    }
  };

  const popupContentStyle = {
    position: 'absolute',
    top: '56px',
    left: '50%',
    width: '634px',
    height: 'auto',
    borderRadius: '14px',
    background: 'var(--white)',
    transform: 'translateX(-50%)',
  };

  const overlayStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
      overlayStyle={overlayStyle}
    >
      <div className="replyModal">
        <div className="replyModalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <div className="replyContentBody">
          <div className="imgBox">
            <img className="userImg" src={profileImg} alt="user-img" />
            <span className="bar"></span>
          </div>
          <div className="singleReplyMainContent">
            <div className="singleReplyContent">
              <span className="name">Apple</span>
              <span className="account">@apple</span>
              <span className="dot"></span>
              <span className="date">{tweet.updatedAt}</span>
            </div>
            <div className="content">{tweet.description}</div>
            <span className="replyTo">@apple</span>
          </div>
        </div>
        <div className="modalBody">
          <img className="userImg" src={profileImg} alt="avatar" />
          <textarea
            className="tweetInput"
            value={replyMsg}
            onChange={handleTweetTextChange}
            placeholder="推你的回覆"
          />
        </div>
        <div className="modalFooter">
          <div>
            {errorMessage && <p className="characterLimit">{errorMessage}</p>}
            <button className="btn" onClick={handleTweet}>
              回覆
            </button>
            {/* 點擊推文按鈕後可以新增reply，等待api串接 */}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupReply;
