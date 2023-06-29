import { useEffect, useState } from "react";
import {
  getUserLikes,
  getUserRepliedTweets,
  getUserTweets,
} from "../../api/tweets";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserOtherItem from "../../component/userInfo/userOther/UserOther";
import { getPopularList } from "../../api/popularlist.js";
import { getUserPageById } from "../../api/getUserPage";
import { useUserId } from "../../contexts/UserIdContext";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import UserRepliesList from "../../component/userRepliesList/UserRepliesList";
import UserLikesList from "../../component/userLikesList/UserLikesList";
import "../MainPage/MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const UserOther = () => {
  const { userId, setUserIdFromTweet } = useUserId();
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await getUserTweets(userId);
        setTweets(userTweets);
      } catch (error) {
        console.error("获取用户推文失败：", error);
      }

      try {
        const userReplies = await getUserRepliedTweets(userId);
        setReplies(userReplies);
      } catch (error) {
        console.error("獲取用戶資料失败：", error);
      }

      try {
        const userLikes = await getUserLikes(userId);

        setLikes(userLikes);
      } catch (error) {
        console.error("获取用户喜欢的推文失败：", error);
      }

      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error("获取热门列表失败：", error);
      }

      try {
        const user = await getUserPageById(userId);
        setUserData(user);
      } catch (error) {
        console.error("获取用户信息失败：", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header username={userData?.name} tweetCount={userData?.TweetCount} />
        <div className="postSection">
          <UserOtherItem
            id={userData?.id}
            avatar={userData?.avatar}
            username={userData?.name}
            accountName={userData?.account}
            bio={userData?.introduction}
            followingCount={userData?.followingCount}
            followersCount={userData?.followerCount}
            banner={userData?.banner}
            isFollowed={userData?.isFollowing}
            followerId={userData?.id}
            setUserIdFromTweet={setUserIdFromTweet}
          />
        </div>
        <TabBar
          activePage="UserOther"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="tweetsSection">
          {activeTab === "tweets" && (
            <UserTweetsList
              tweets={tweets}
              className="tweetsSection"
              setTweetsList={setTweets}
            />
          )}
          {activeTab === "replies" && (
            <UserRepliesList replies={replies} className="tweetsSection" />
          )}
          {activeTab === "likes" && (
            <UserLikesList
              likes={likes}
              className="tweetsSection"
              setTweetsList={setLikes}
            />
          )}
        </div>
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default UserOther;
