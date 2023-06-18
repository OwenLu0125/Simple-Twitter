import SingleReply from './singleReply/SingleReply';
import profileImg from '../../assets/img/canadian-girl.jpg';
import './ReplyListBox.scss';

const ReplyListBox = ({ replies, replyTo }) => {
  return (
    <div className="replyListBox">
      {replies.map((reply) => (
        <SingleReply
          key={reply.id}
          img={reply.User.avatar}
          username={reply.User.name}
          accountName={reply.User.account}
          postTime={reply.updatedAt}
          content={reply.comment}
          replyTo={replyTo}
        />
      ))}
    </div>
  );
};

export default ReplyListBox;
