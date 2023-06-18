import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList.jsx';
import Post from '../../component/post/Post';
import TweetsList from '../../component/tweets/TweetList';
import { getTweets } from '../../api/tweets';
import { getPopularList } from "../../api/popularlist.js";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./MainPage.scss";

const Main = () => {
  const [tweets, setTweets] = useState([]);
  const [popularCards, setPopularCards] = useState([]);

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
    const getPopularCardsAsync = async () => {
      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error(error);
      }
    };
    getPopularCardsAsync();
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
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default Main;
