import { formatTime } from "../../../utils/timeUtils";
import grayLogo from "../../../assets/logoGray.svg";
import "./SingleReply.scss";

const SingleReply = ({
  img,
  username,
  accountName,
  postTime,
  content,
  replyTo,
}) => {
  return (
    <div className="singleReplyContainer">
      <img className="userImg" src={img ?? grayLogo} alt="user-img" />
      <div className="singleReplyMainContent">
        <div className="singleReplyContent">
          <span className="name">{username}</span>
          <span className="account">{accountName}</span>
          <span className="dot" />
          <span className="date">{formatTime(postTime)}</span>
        </div>
        <span className="replyTo">@{replyTo}</span>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};

export default SingleReply;
