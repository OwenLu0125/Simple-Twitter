import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList';
import Post from '../../component/post/Post';
import TweetsList from '../../component/tweets/TweetList';
import './MainPage.scss';
import { getTweets } from '../../api/tweets';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Main = () => {
  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <div className="postSection">
          <Post />
        </div>
        <div className="tweetsSection">
          <TweetsList tweets={tweets} className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default Main;
