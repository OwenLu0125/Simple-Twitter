import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '../../assets/closeIcon.svg';
import UserPhotoIcon from '../../assets/postPhoto.svg';
import { postTweet } from '../../api/tweets';
import './PopupModal.scss';

const PopupModal = ({ open, onClose }) => {
  const [tweetText, setTweetText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTweetTextChange = (event) => {
    setTweetText(event.target.value);
  };

  const handlePopupClose = () => {
    setTweetText('');
    onClose();
  };

  const handleTweet = async () => {
    if (tweetText.length > 140) {
      setErrorMessage('字數不可超過140字');
      return;
    }

    if (tweetText.length === 0) {
      setErrorMessage('內容不可空白');
      return;
    }

    try {
      const response = await postTweet({ tweetText });
      console.log('推文已發布:', response);

      setTweetText('');
      setErrorMessage('');

      onClose();
      window.location.reload(); //可在優化
    } catch (error) {
      console.error('發佈推文失败:', error);
    }
  };
  const popupContentStyle = {
    position: 'absolute',
    top: '56px',
    left: '50%',
    width: '634px',
    height: '300px',
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
      <div className="modal">
        <div className="modalHeader">
          <img src={CloseIcon} alt="close" onClick={handlePopupClose} />
        </div>
        <hr />
        <div className="modalBody">
          <img src={UserPhotoIcon} alt="avatar" className="userAvatar" />
          <textarea
            className="tweetInput"
            value={tweetText}
            onChange={handleTweetTextChange}
            placeholder="有什麼新鮮事？"
          />
        </div>
        <div className="modalFooter">
          {errorMessage && <p className="characterLimit">{errorMessage}</p>}
          <button className="orangeButton" onClick={handleTweet}>
            推文
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupModal;
