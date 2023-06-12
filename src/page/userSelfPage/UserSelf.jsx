import { useEffect, useState } from "react";
import { getTweets } from "../../api/tweets";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import TweetsList from "../../component/tweets/TweetList";
import UserInfo from "../../component/userInfo/UserInfo";
import "../mainPage/MainPage.scss";

const UserSelf = () => {
  //TweetsList裡面的api資料要更改為自己的推文
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
        <Header username="John Doe" tweetCount={25} />
        <div className="postSection">
          <UserInfo
            username="John Doe"
            accountName="heyjohn"
            bio="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. "
            followingCount={34}
            followersCount={59}
          />
        </div>
        <TabBar />
        <hr />
        <div className="tweetsSection">
          <TweetsList TweetsList tweets={tweets} className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default UserSelf;
