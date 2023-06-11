import Navbar from '../../component/navbar/Navbar'
import PopularList from '../../component/popularList/PopularList';
import Post from '../../component/post/Post';
import TweetsList from '../../component/tweets/TweetList';
import './MainPage.scss';
import { getTweets } from '../../api/tweets';
import { useEffect, useState } from 'react';

const Main = () => {
  const [tweets, setTweets] = useState([]);

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
