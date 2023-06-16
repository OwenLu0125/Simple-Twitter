import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList';
import MainReply from '../../component/mainReply/MainReply';
import ReplyListBox from '../../component/replyListBox/ReplyListBox';
import ArrowLeft from '../../assets/arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getSingleTweet, getTweetReplies } from '../../api/tweets';
import { useEffect, useState } from 'react';
import { useId } from '../../contexts/IdContext';
import './ReplyList.scss';

const ReplyList = () => {
  const [singleTweet, setSingleTweet] = useState({});
  const [tweetReplies, setTweetReplies] = useState([]);
  const { currentId } = useId();

  useEffect(() => {
    const getTweet = async () => {
      try {
        const tweet = await getSingleTweet(currentId);
        console.log(tweet);
        setSingleTweet(tweet);
      } catch (error) {
        console.error(error);
      }
    };
    getTweet();
  }, [currentId]);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const replies = await getTweetReplies(currentId);
        console.log(replies);
        setTweetReplies([...replies]);
      } catch (error) {
        console.error(error);
      }
    };
    getReplies();
  }, [currentId]);

  return (
    <div className="replyMainContainer">
      <Navbar />
      <div className="subContainer">
        <div className="replyTitleContainer">
          <Link to="/mainpage">
            <img className="img" src={ArrowLeft} alt="arrow" />
          </Link>
          <h4 className="medium">推文</h4>
        </div>
        <MainReply
          tweet={singleTweet}
          tweetSet={setSingleTweet}
          repliesSet={setTweetReplies}
        />
        <ReplyListBox replies={tweetReplies} replyTo="" />
      </div>
      <PopularList />
    </div>
  );
};

export default ReplyList;
