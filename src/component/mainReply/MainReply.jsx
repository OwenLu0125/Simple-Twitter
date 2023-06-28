import React, { useContext, useState } from "react";
import { unlikeTweet, likeTweet } from "../../api/likeAndUnlike";
import { useAuth } from "../../contexts/AuthContext";
import { postReply } from "../../api/tweets";
import { TweetsContext } from "../../contexts/TweetsContext";
import { formatDate } from "../../utils/timeUtils";
import commentIcon from "../../assets/commit.svg";
import emptyHeart from "../../assets/heart.svg";
import fullHeart from "../../assets/like-heart.svg";
import PopupReply from "../popupReply/PopupReply";
import "./MainReply.scss";

const MainReply = ({ tweet, repliesSet, tweetSet, setTweet }) => {
  const [showModal, setShowModal] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { currentMember } = useAuth();
  const { setTweets } = useContext(TweetsContext);

  const handleTweetTextChange = ({ target: { value } }) => {
    setReplyMsg(value);
  };

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

  const handleTweet = async () => {
    if (replyMsg.length === 0) {
      setErrorMessage("內容不可空白");
      return;
    }
    try {
      const response = await postReply({ id: tweet.id, comment: replyMsg });
      console.log("推文已發布:", response);

      setReplyMsg("");
      setErrorMessage("");

      setTweets?.((prevTweets) => {
        return prevTweets.map((prevTweet) => {
          if (prevTweet.id === tweet.id) {
            return {
              ...prevTweet,
              RepliesCount: tweet.RepliesCount + 1,
              replyCount: tweet.replyCount + 1,
            };
          }
          return { ...prevTweet };
        });
      });

      repliesSet?.((prev) => {
        return [
          ...prev,
          {
            ...response.data,
            User: { ...currentMember },
          },
        ];
      });

      tweetSet?.((prev) => {
        return { ...prev, tweetReplyCount: prev.tweetReplyCount + 1 };
      });

      //window.location.reload(); //可在優化
    } catch (error) {
      console.error("發佈推文失败:", error);
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
          <p>{formatDate(tweet.updatedAt)}</p>
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
      <div className="modalBody">
        <img className="userImg" src={currentMember?.avatar} alt="avatar" />
        <input
          className="tweetInput"
          value={replyMsg}
          onChange={handleTweetTextChange}
          placeholder="推你的回覆"
        />

        {errorMessage && <p className="characterLimit">{errorMessage}</p>}
        <button className="orangeButton" onClick={handleTweet}>
          回覆
        </button>
      </div>

      {showModal && (
        <PopupReply
          open={showModal}
          onClose={handleCloseModal}
          repliesSet={repliesSet}
          tweetSet={tweetSet}
        />
      )}
    </div>
  );
};

export default MainReply;
