import React, { useState } from "react";
import commitIcon from "../../assets/commit.svg";
import heartIcon from "../../assets/heart.svg";
import { likeTweet, unlikeTweet } from "../../api/likeAndUnlike";
import { useNavigate } from "react-router-dom";
import { useId } from "../../contexts/IdContext";
import PopupReply from "../popupReply/PopupReply";
import "./UserPageTweet.scss";

const UserPageTweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  likes,
  replyTo,
  hideFooter,
  onGetUserIdFromTweet,
  isLiked,
  tweetId,
  setList,
}) => {
  const { checkItemId } = useId();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOneTweet = async () => {
    checkItemId(tweetId);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId || tweet.TweetId === tweetId) {
              return {
                ...tweet,
                likeCount: tweet.likeCount - 1,
                isLiked: false,
              };
            }
            return { ...tweet };
          });
        });
      } else {
        await likeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId || tweet.TweetId === tweetId) {
              return {
                ...tweet,
                likeCount: tweet.likeCount + 1,
                isLiked: true,
              };
            }
            return { ...tweet };
          });
        });
      }
    } catch (error) {
      console.error("喜歡推文失败:", error);
    }
  };
  return (
    <>
      <div
        className="tweetContainer"
        onClick={(e) => {
          if (e.target.tagName !== "IMG") {
            checkItemId(tweetId);
            navigate("/reply_list");
          }
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="userImage"
          onClick={onGetUserIdFromTweet}
        />

        <div className="tweetContent">
          <div className="tweetHeader">
            <span className="tweetUsername">{username}</span>

            <span className="tweetAccountName">@{accountName}</span>
            <span className="dot" />
            <span className="tweetPostTime">{postTime}</span>
          </div>

          {replyTo && (
            <div className="replyText">
              回覆 <span>@{replyTo}</span>
            </div>
          )}

          <div className="tweetText">{content}</div>

          <div className="tweetFooter">
            {!hideFooter && (
              <>
                <div className="tweetComments" onClick={() => handleOneTweet()}>
                  <img
                    src={commitIcon}
                    alt="commit icon"
                    onClick={handleOpenModal}
                  />
                  <span className="commentCount">{comments}</span>
                </div>
                <div className="tweetLikes" onClick={handleLike}>
                  <img
                    src={heartIcon}
                    alt="heart icon"
                    className={`${isLiked ? "redHeart" : ""}`}
                  />
                  <span className="likeCount">{likes}</span>
                </div>
              </>
            )}
          </div>
          {showModal && (
            <PopupReply
              open={showModal}
              onClose={handleCloseModal}
              setList={setList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserPageTweet;
