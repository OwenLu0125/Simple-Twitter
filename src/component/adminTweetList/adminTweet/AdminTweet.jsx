import './AdminTweet.scss';
import deleteIcon from '../../../assets/delete.svg';
import { DeleteTweetByAdmin } from '../../../api/admin';
import { formatTime } from "../../../utils/timeUtils";
import Swal from "sweetalert2";

const AdminTweet = ({
  tweetId,
  tweetOwnerAvatar,
  username,
  accountName,
  postTime,
  content,
  setList,
}) => {
  const handleDelete = async () => {
    try {
      await Swal.fire({
        title: "確認刪除該則推文?",
        text: "此動作無法還原！！！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("已刪除！", "推文已刪除", "success");
          DeleteTweetByAdmin(tweetId);
          setList((prev) => {
            return prev.filter((tweet) => {
              return tweet.id !== tweetId;
            });
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div key={tweetId} className="adminTweetContainer">
      <img className="userImg" src={tweetOwnerAvatar} alt="user-img" />
      <div className="adminMainContent">
        <div className="adminTweetContent">
          <span className="name">{username}</span>
          <span className="account">{accountName}</span>
          <span className="dot" />
          <span className="date">{formatTime(postTime)}</span>
        </div>
        <div className="content">{content}</div>
      </div>
      <img
        className="delete"
        src={deleteIcon}
        alt="delete-icon"
        onClick={handleDelete}
      />
    </div>
  );
};

export default AdminTweet;
